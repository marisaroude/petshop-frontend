'use client'
import React, { useEffect, useState } from 'react'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { getMascotaByPersonaId } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import MascotaInfo from '@/components/mascotas/MascotaInfo'
const isActive = mascota => mascota.fecha_baja === null

function page() {
  const { slug } = useParams()
  const [mascotas, setMascotas] = useState(null)
  const [filtro, setFiltro] = useState('activas') // 'activas' | 'no activas' | 'todas'

  const mascotasFiltered = mascotas
    ?.filter(mascota => {
      if (filtro === 'activas') return isActive(mascota)
      if (filtro === 'no activas') return !isActive(mascota)
      return true
    })
    ?.sort((a, b) => b.id_mascota - a.id_mascota)

  useEffect(() => {
    const fetchMascotas = async () => {
      const response = await getMascotaByPersonaId({
        id_persona: parseInt(slug),
      })

      setMascotas(response)
    }
    fetchMascotas()
  }, [])
  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex justify-end">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}>
          <option value="todas">Todas las mascotas</option>
          <option value="activas">Solo mascotas activas</option>
          <option value="no activas">Solo mascotas dadas de baja</option>
        </select>
      </div>
      <h1 className="text-3xl">Mascotas del usuario 🐾</h1>
      {mascotasFiltered?.map((mascota, index) => (
        <div className="w-full" key={index}>
          <MascotaInfo mascota={mascota} />
        </div>
      ))}

      {mascotasFiltered?.length === 0 && (
        <div className="text-center p-8 font-bold text-2xl">
          <span>
            {filtro === 'no activas'
              ? 'No hay mascotas inactivas.'
              : filtro === 'activas'
              ? 'El user no tiene mascotas activas.'
              : filtro === 'todas'
              ? 'El user no tiene  mascotas.'
              : ''}
          </span>
        </div>
      )}
    </div>
  )
}

export default withAdminAuth(page)
