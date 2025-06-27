'use client'
import React, { useEffect, useState } from 'react'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { getInformationIngresosByProductId } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import CustomTable from '@/components/table/CustomTable'

function page() {
  const { slug } = useParams()
  const [ingresos, setIngresos] = useState([])
  useEffect(() => {
    const fetchIngresos = async () => {
      try {
        const response = await getInformationIngresosByProductId({
          id_ps: parseInt(slug),
        })
        setIngresos(response)
      } catch (err) {
        console.error('Error al cargar datos de ingresos:', err)
      }
    }
    fetchIngresos()
  }, [])
  const resumenPorProveedor = ingresos.reduce((acc, ingreso) => {
    const { id_proveedor, nombre, cuit } = ingreso.proveedor
    if (!acc[id_proveedor]) {
      acc[id_proveedor] = {
        id: id_proveedor,
        proveedor: nombre,
        cuit: cuit,
        cantidad: 0,
        total_facturado: 0,
      }
    }

    acc[id_proveedor].cantidad += ingreso.cantidad
    acc[id_proveedor].total_facturado += ingreso.subtotal

    return acc
  }, {})

  const ingresosRows = Object.values(resumenPorProveedor)

  const columns = [
    { field: 'proveedor', headerName: 'Proveedor', flex: 1 },
    { field: 'cuit', headerName: 'CUIT', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad Ingresada', flex: 1 },
    { field: 'total_facturado', headerName: 'Total Facturado', flex: 1 },
  ]

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <CustomTable
        title="Ingresos por proveedor"
        rows={ingresosRows}
        columns={columns}
      />
    </div>
  )
}

export default withAdminAuth(page)
