'use client'
import React from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import IngresoForm from '@/components/forms/IngresoForm'

function page() {
  useSignals()
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <IngresoForm />
    </div>
  )
}

export default withAdminAuth(page)
