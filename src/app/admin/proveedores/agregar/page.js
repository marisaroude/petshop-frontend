'use client'
import React from 'react'
import ProveedorForm from '@/components/forms/ProveedorForm'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'

function page() {
  useSignals()
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ProveedorForm />
    </div>
  )
}

export default withAdminAuth(page)
