'use client'
import React from 'react'
import ProductForm from '@/components/forms/ProductForm'
import withAdminAuth from '@/app/utils/withAdminAuth'

function page() {
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ProductForm />
    </div>
  )
}

export default withAdminAuth(page)
