'use client'
import React from 'react'
import ProductForm from '@/components/forms/ProductForm'
import withAdminAuth from '../utils/withAdminAuth'

import { CldImage } from 'next-cloudinary'
import { UploadImage } from '@/components/inputs/UploadImage'

function page() {
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ProductForm />
    </div>
  )
}

//To-do implemntar exportarlo con with admin auth
export default page
