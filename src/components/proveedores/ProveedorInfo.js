import React from 'react'
import Link from 'next/link'

export default function ProveedorInfo({ proveedor }) {
  if (!proveedor) return <></>
  return (
    <div className="bg-lightgreen rounded-xl p-8 shadow-md max-w-4xl space-y-4 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 ">Proveedor</h2>

      <div className="flex flex-row gap-6 w-full justify-start items-start">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full capitalize">
          <p className="font-semibold">Nombre Proveedor:</p>
          <p>{proveedor.nombre}</p>

          <p className="font-semibold">Cuit:</p>
          <p>{proveedor.cuit}</p>

          <p className="font-semibold">Proveedor Activo:</p>
          <p>{proveedor.activo ? 'Si' : 'No'}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/admin/proveedores/editar/${proveedor.id_proveedor}`}
          className="bg-green-300 hover:bg-green-400 text-green-900 font-medium py-1.5 px-4 rounded-md transition-colors">
          Editar Proveedor
        </Link>
      </div>
    </div>
  )
}
