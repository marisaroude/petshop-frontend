'use client' // 👈 Ensure it's a Client Component

import { BackgroundColorProvider } from '@/app/context/backgroundColorContext'
import { AuthProvider } from '../app/context/authContext'
import { SessionProvider } from 'next-auth/react'

export default function SessionWrapper({ children }) {
  return (
    <>
      <SessionProvider>
        <AuthProvider>
          <BackgroundColorProvider>{children}</BackgroundColorProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}
