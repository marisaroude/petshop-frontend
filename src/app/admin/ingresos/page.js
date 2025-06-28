'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import { getAllIngresosProductos } from '@/lib/graphql'
import { allProveedores } from '@/app/signals/proveedores'
import { allProducts } from '@/app/signals/products'

function page() {
  useSignals()
  const [ingresos, setIngresos] = useState([])
  const columns = [
    { field: 'fecha_ingreso', headerName: 'Fecha Ingreso', flex: 1 },
    { field: 'proveedor', headerName: 'Proveedor', flex: 1 },
    { field: 'subtotal', headerName: 'Subotal', flex: 1 },
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad de items adquiridos', flex: 1 },
  ]

  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await getAllIngresosProductos()

        const rows = response.map(ingreso => ({
          id: ingreso.id_ip,
          fecha_ingreso: ingreso.fecha_ingreso,
          proveedor: allProveedores.value?.find(
            prov => prov.id_proveedor === ingreso.id_proveedor,
          )?.nombre,
          subtotal: ingreso.subtotal,
          producto: allProducts.value?.find(
            prov => prov.id_ps === ingreso.id_ps,
          )?.nombre,
          cantidad: ingreso.cantidad,
        }))

        setIngresos(rows)
      } catch (err) {
        console.error('Error al cargar facturas:', err)
      }
    }

    fetchIngresos()
  }, [allProveedores.value, allProducts.value])

  return (
    <div className="bg-white min-h-screen sm:p-6 w-full flex flex-col items-center gap-6">
      <CustomTable
        title="Listado de Ingresos"
        rows={[...ingresos].sort((a, b) => b.id - a.id)}
        columns={columns}
      />
    </div>
  )
}

export default withAdminAuth(page)
