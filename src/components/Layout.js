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
import { fetchProducts } from '@/app/utils/products'

export default function Layout({ children }) {
  const pathname = usePathname()
  const isCompleteProfile = pathname === '/complete-profile'
  const pageDontShowCategories = ['cart']
  console.log('pathname', pathname)

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
    loadProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen items-center">
      {!isCompleteProfile && (
        <>
          <HeaderWithImage />
          <SearchAndUserBar />
          {!pageDontShowCategories.includes(`/${pathname}`) && (
            <CategoriesBar />
          )}
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 h-full w-full">{children}</div>
      <Footer />
    </div>
  )
}
