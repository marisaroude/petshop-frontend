'use client'
import React from 'react'
import PromocionForm from '@/components/forms/PromocionForm'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'

function page() {
  useSignals()
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <PromocionForm />
    </div>
  )
}

export default withAdminAuth(page)
