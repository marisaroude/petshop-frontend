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
import { fetchProducts, fetchPromos } from '@/app/utils/fetchs'
import { useSignals } from '@preact/signals-react/runtime'
import { allPromos } from '@/app/signals/promociones'

export default function Layout({ children }) {
  useSignals()
  const pathname = usePathname()
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
            allProducts.value = response
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
            allPromos.value = response
          }
        } catch (error) {
          console.error('Error al cargar las promociones en Layout:', error)
        }
      }
    }
    loadProducts()
    loadPromociones()
  }, [])

  return (
    <div className="flex flex-col min-h-screen items-center">
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
