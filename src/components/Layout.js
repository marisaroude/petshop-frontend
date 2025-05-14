'use client'
import SearchAndUserBar from './bars/SearchAndUserBar'
import Footer from './footer/Footer'
import HeaderWithImage from './header/HeaderWithImage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <HeaderWithImage />
      <SearchAndUserBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex-1 h-full w-full">{children}</div>
      <Footer />
    </div>
  )
}
