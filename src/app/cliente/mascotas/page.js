'use client'

import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withUserAuth from '@/app/utils/withUserAuth'
import { getMascotaByPersonaId } from '@/lib/graphql'
import { useAuth } from '@/app/context/authContext'
import MascotaInfo from '@/components/mascotas/MascotaInfo'

const isActive = mascota => mascota.fecha_baja === null

function page() {
  useSignals()
  const { user } = useAuth()
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
        id_persona: user.id_persona,
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
          <option value="todas">Todas mis mascotas</option>
          <option value="activas">Solo mascotas activas</option>
          <option value="no activas">Solo mascotas dadas de baja</option>
        </select>
      </div>
      <h1 className="text-3xl">Mis mascotas 🐾</h1>
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
              ? 'No tienes mascotas activas, '
              : filtro === 'todas'
              ? 'No tienes mascotas, '
              : ''}
            {(filtro === 'todas' || filtro === 'activas') && (
              <a
                className="underline cursor-pointer"
                href="/cliente/mascotas/agregar">
                ¡agrega una!
              </a>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

export default withUserAuth(page)
