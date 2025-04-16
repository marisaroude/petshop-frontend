'use client'
import BannerBottom from '@/components/banner/BannerBottom'
import RegisterForm from '@/components/forms/RegisterForm'
import SimpleHeader from '@/components/header/SimpleHeader'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function CompleteProfile() {
  const { data: session } = useSession()

  console.log('session', session)

  return (
    session && (
      <div className="bg-white h-full w-full flex flex-col items-center">
        <SimpleHeader />
        <RegisterForm userInfo={session.user} />
        <BannerBottom />
      </div>
    )
  )
}
