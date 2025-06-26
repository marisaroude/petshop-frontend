'use client'
import BannerBottom from '@/components/banner/BannerBottom'
import RegisterForm from '@/components/forms/RegisterForm'
import SimpleHeader from '@/components/header/SimpleHeader'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import withoutAuth from '../utils/withoutAuth'
import { useRouter } from 'next/navigation'

function CompleteProfile() {
  const { data: session, status } = useSession()
  const isCompleted = session?.user?.profileCompleted
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  if (!session) {
    return null
  }

  return (
    !isCompleted && (
      <div className="bg-white h-full w-full flex flex-col items-center">
        <SimpleHeader />
        <RegisterForm userInfo={session?.user} />
        <BannerBottom />
      </div>
    )
  )
}

export default withoutAuth(CompleteProfile)
