import React from 'react'
import Link from 'next/link'

export default function UserInfo({ user }) {
  if (!user) return <></>
  return (
    <div className="bg-lightgreen rounded-xl p-8 shadow-md max-w-4xl space-y-4 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 ">Usuario</h2>

      <div className="flex flex-row gap-6 w-full justify-start items-start">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full capitalize">
          <p className="font-semibold">Nombre:</p>
          <p>{user.nombre}</p>

          <p className="font-semibold">Apellido:</p>
          <p>{user.apellido}</p>

          <p className="font-semibold">DNI:</p>
          <p>{user.dni}</p>

          <p className="font-semibold">Telefono:</p>
          <p>{user.telefono}</p>

          <p className="font-semibold ">Correo Electronico:</p>
          <p className="lowercase">{user.correo_electronico}</p>

          <p className="font-semibold">Domicilio:</p>
          <p>{user.domicilio}</p>

          <p className="font-semibold">Tipo:</p>
          <p>{user.tipo ? 'Admin' : 'Cliente'}</p>

          <p className="font-semibold">
            {user.fecha_baja ? 'Fecha de Baja:' : 'Usuario Activo:'}
          </p>
          <p>{user.fecha_baja ? user.fecha_baja : 'Si'}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/admin/clientes/editar/${user.id_persona}`}
          className="bg-green-300 hover:bg-green-400 text-green-900 font-medium py-1.5 px-4 rounded-md transition-colors">
          Editar Cliente
        </Link>
      </div>
    </div>
  )
}
