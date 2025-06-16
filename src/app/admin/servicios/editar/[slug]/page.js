'use client'
import React, { useEffect, useState } from 'react'
import { getProductById } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import ServicioForm from '@/components/forms/ServicioForm'

function page() {
  const { slug } = useParams()
  const [service, setService] = useState(null)

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setService(response)
    }
    fetchProductById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ServicioForm servicioInfo={service} />
    </div>
  )
}

export default withAdminAuth(page)
