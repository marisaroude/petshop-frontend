'use client'
import { usePathname } from 'next/navigation'
import SearchAndUserBar from './bars/SearchAndUserBar'
import Footer from './footer/Footer'
import HeaderWithImage from './header/HeaderWithImage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoriesBar from './bars/CategoriesBar'
import { allProducts } from '@/app/signals/products'
import { useEffect } from 'react'
import {
  fetchProducts,
  fetchPromos,
  fetchProveedores,
  fetchsMascotas,
  fetchsProductsCartById,
  fetchPersonas,
} from '@/app/utils/fetchs'
import { useSignals } from '@preact/signals-react/runtime'
import { allPromos } from '@/app/signals/promociones'
import { allProveedores } from '@/app/signals/proveedores'
import { useAuth } from '@/app/context/authContext'
import { allMascotas } from '@/app/signals/mascota'
import { allProductsCart } from '@/app/signals/cart'
import { allUsers } from '@/app/signals/user'

export default function Layout({ children }) {
  useSignals()
  const pathname = usePathname()
  const { user } = useAuth()
  const isCompleteProfile = pathname === '/complete-profile'
  const pageDontShowCategories = ['/cart', '/search']

  const shouldHideCategories = pageDontShowCategories.some(path =>
    pathname.startsWith(path),
  )

  useEffect(() => {
    const loadProducts = async () => {
      if (!allProducts.value || allProducts.value.length === 0) {
        try {
          const response = await fetchProducts()
          if (response) {
            allProducts.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error('Error al cargar productos en Layout:', error)
        }
      }
    }
    const loadPromociones = async () => {
      if (!allPromos.value || allPromos.value.length === 0) {
        try {
          const response = await fetchPromos()
          if (response) {
            allPromos.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error('Error al cargar las promociones en Layout:', error)
        }
      }
    }
    loadProducts()
    loadPromociones()
  }, [])

  useEffect(() => {
    const loadProveedores = async () => {
      if (!allProveedores.value || allProveedores.value.length === 0) {
        try {
          const response = await fetchProveedores()
          if (response) {
            allProveedores.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error('Error al cargar los proveedores en Layout:', error)
        }
      }
    }

    const loadMascotas = async () => {
      if (!allMascotas.value || allMascotas.value.length === 0) {
        try {
          const response = await fetchsMascotas()
          if (response) {
            allMascotas.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error('Error al cargar las mascotas en Layout:', error)
        }
      }
    }

    const loadPersonas = async () => {
      if (!allUsers.value || allUsers.value.length === 0) {
        try {
          const response = await fetchPersonas()
          if (response) {
            allUsers.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error('Error al cargar personas en Layout:', error)
        }
      }
    }

    const loadProductsCart = async () => {
      if (!user) return
      if (!allProductsCart.value || allProductsCart.value.length === 0) {
        try {
          const response = await fetchsProductsCartById(user?.id_persona)
          if (response) {
            allProductsCart.value = response.filter(Boolean)
          }
        } catch (error) {
          console.error(
            'Error al cargar los productos del carrito en Layout:',
            error,
          )
        }
      }
    }

    if (user?.tipo) {
      loadProveedores()
      loadMascotas()
      loadPersonas()
    }
    loadProductsCart()
  }, [user])

  return (
    <div className="flex flex-col min-h-screen items-center w-screen">
      {!isCompleteProfile && (
        <>
          <HeaderWithImage />
          <SearchAndUserBar />
          {!shouldHideCategories && <CategoriesBar />}
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 h-full w-full">{children}</div>
      <Footer />
    </div>
  )
}
