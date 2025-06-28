'use client'
import React, { useEffect, useState } from 'react'
import MascotaForm from '@/components/forms/MascotaForm'
import { useParams } from 'next/navigation'
import { getMascotaById } from '@/lib/graphql'
import withAdminAuth from '@/app/utils/withAdminAuth'

function page() {
  const { idMascota } = useParams()
  const [mascota, setMascota] = useState(null)

  useEffect(() => {
    const fetchMascotaById = async () => {
      const response = await getMascotaById({ id_mascota: parseInt(idMascota) })
      setMascota(response)
    }
    fetchMascotaById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <MascotaForm mascotaInfo={mascota} />
    </div>
  )
}

export default withAdminAuth(page)
