import { useRouter } from 'next/navigation'
import React from 'react'

export default function HeaderWithImage() {
  const router = useRouter()
  return (
    <div className="bg-white items-center flex justify-center sm:justify-between shadow-lg w-full">
      <img
        onClick={() => router.push('/')}
        src="/LOGO-puppis.png"
        alt="Logo"
        className="h-20 sm:pl-8 cursor-pointer"
      />
      <img
        src="/ILLUSTRATION-dog.png"
        alt="Illustration Dog"
        className="hidden sm:block h-36"
      />
    </div>
  )
}
