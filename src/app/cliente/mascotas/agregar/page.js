'use client'
import React from 'react'
import withUserAuth from '@/app/utils/withUserAuth'
import MascotaForm from '@/components/forms/MascotaForm'

function page() {
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <MascotaForm />
    </div>
  )
}

export default withUserAuth(page)
