'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { allProveedores } from '@/app/signals/proveedores'
import { getAllProveedores } from '@/lib/graphql'
import ProveedorInfo from '@/components/proveedores/ProveedorInfo'
import Link from 'next/link'

function isActive(proveedor) {
  return proveedor.activo
}
function page() {
  useSignals()

  const [filtro, setFiltro] = useState('todos') // 'activos' | 'no activos' | 'todos'
  const [visibleCount, setVisibleCount] = useState(5)

  const proveedoresFiltered = allProveedores?.value
    ?.filter(proveedores => {
      if (filtro === 'activos') return isActive(proveedores)
      if (filtro === 'no-activos') return !isActive(proveedores)
      return true
    })
    ?.sort((a, b) => b.id_proveedor - a.id_proveedor)

  const visibleProveedores = proveedoresFiltered?.slice(0, visibleCount)

  useEffect(() => {
    if (!allProveedores.value) {
      const fetchProveedores = async () => {
        const response = await getAllProveedores()
        allProveedores.value = response
      }
      fetchProveedores()
    }
  }, [])
  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full gap-2 max-w-4xl flex justify-end">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activos">Solo Activos</option>
          <option value="no-activos">Solo No Activos</option>
        </select>

        <div className="flex justify-end">
          <Link
            href={`/admin/proveedores/agregar`}
            className="bg-green-300 hover:bg-green-400 text-green-900 font-medium py-1.5 px-4 rounded-md transition-colors">
            Crear un Proveedor
          </Link>
        </div>
      </div>

      {visibleProveedores?.map((proveedor, index) => (
        <div className="w-full max-w-4xl" key={index}>
          <ProveedorInfo proveedor={proveedor} />
        </div>
      ))}

      {/* Ver más */}
      {visibleCount < proveedoresFiltered?.length && (
        <button
          onClick={() => setVisibleCount(prev => prev + 10)}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
          Ver más
        </button>
      )}
    </div>
  )
}

export default withAdminAuth(page)
