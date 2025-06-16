'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import ProveedorForm from '@/components/forms/ProveedorForm'
import { getProveedorById } from '@/lib/graphql'

function page() {
  const { slug } = useParams()
  const [proveedor, setProveedor] = useState(null)

  useEffect(() => {
    const fetchProveedorById = async () => {
      const response = await getProveedorById({ id_proveedor: parseInt(slug) })
      setProveedor(response)
    }
    fetchProveedorById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ProveedorForm proveedor={proveedor} />
    </div>
  )
}

export default withAdminAuth(page)
