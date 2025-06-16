'use client'
import React from 'react'
import withAdminAuth from '@/app/utils/withAdminAuth'
import ServicioForm from '@/components/forms/ServicioForm'

function page() {
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ServicioForm />
    </div>
  )
}

export default withAdminAuth(page)
