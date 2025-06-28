import React from 'react'
import Link from 'next/link'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { useAuth } from '@/app/context/authContext'
// /admin/clientes/24/mascotas/18/editar
export default function MascotaInfo({ mascota }) {
  if (!mascota) return <></>

  const { bgColor, textButtonColor, bgButtonColor } = useBackgroundColor()
  const { user } = useAuth()
  return (
    <div
      className={`${bgColor} rounded-xl p-8 shadow-md max-w-4xl space-y-4 w-full mx-auto`}>
      <h2 className="text-xl font-semibold text-gray-800 ">Mascota</h2>

      <div className="flex sm:flex-row flex-col gap-6 w-full sm:justify-start justify-center sm:items-start items-center">
        <div className="flex sm:flex-row flex-col w-full gap-6 sm:justify-start justify-center sm:items-start items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center text-center text-sm text-gray-500 px-2">
            {mascota.image ? (
              <img
                src={mascota.image}
                alt="Mascota"
                className="object-contain w-full h-full rounded-md"
              />
            ) : (
              <span>Sin foto de la mascota</span>
            )}
          </div>

          {/* Información de la mascota */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full break-words">
            <p className="font-semibold">Nombre:</p>
            <p>{mascota.nombre}</p>

            <p className="font-semibold">Tipo:</p>
            <p>{mascota.tipo}</p>

            <p className="font-semibold">Raza:</p>
            <p>{mascota.raza}</p>

            <p className="font-semibold">Descripcion:</p>
            <p>{mascota.descripcion}</p>

            <p className="font-semibold">
              {mascota.fecha_baja ? 'Fecha de Baja:' : 'Mascota Activa:'}
            </p>
            <p>{mascota.fecha_baja ? mascota.fecha_baja : 'Si'}</p>
          </div>
        </div>
      </div>

      <div className="flex sm:justify-end justify-center">
        <Link
          href={
            user?.tipo
              ? `/admin/clientes/${user.id_persona}/mascotas/${mascota.id_mascota}/editar`
              : `/cliente/mascotas/editar/${mascota.id_mascota}`
          }
          className={`${bgButtonColor}-300 hover:${bgButtonColor}-400 ${textButtonColor}-900 font-medium py-1.5 px-4 rounded-md transition-colors`}>
          Editar Mascota
        </Link>
      </div>
    </div>
  )
}
