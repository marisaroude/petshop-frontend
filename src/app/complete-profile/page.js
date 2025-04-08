import BannerBottom from '@/components/banner/BannerBottom'
import RegisterForm from '@/components/forms/RegisterForm'
import SimpleHeader from '@/components/header/SimpleHeader'
import React from 'react'

export default function CompleteProfile() {
  return (
    <div className="bg-white h-screen w-screen">
      <SimpleHeader />
      <RegisterForm />
      <BannerBottom />
    </div>
  )
}
