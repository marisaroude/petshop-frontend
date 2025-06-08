import React from 'react'
import Link from 'next/link'

export default function MascotaInfo({ mascota }) {
  if (!mascota) return <></>
  return (
    <div className="bg-pink rounded-xl p-8 shadow-md max-w-4xl space-y-4 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 ">Mascota</h2>

      <div className="flex flex-row gap-6 w-full justify-start items-start">
        <div className="flex flex-row w-full gap-6 justify-start items-start">
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
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full">
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

      <div className="flex justify-end">
        <Link
          href={`/cliente/mascotas/editar/${mascota.id_mascota}`}
          className="bg-pink-300 hover:bg-pink-400 text-pink-900 font-medium py-1.5 px-4 rounded-md transition-colors">
          Editar Mascota
        </Link>
      </div>
    </div>
  )
}
