'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import Button from '@mui/material/Button'
import { getAllFacturas } from '@/lib/graphql'
import { useRouter } from 'next/navigation'

function page() {
  useSignals()
  const [facturas, setFacturas] = useState([])
  const router = useRouter()
  const columns = [
    { field: 'factura', headerName: 'Factura', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
    { field: 'pago', headerName: 'Pago (Monto)', flex: 1 },
    { field: 'items', headerName: 'Cantidad de items adquiridos', flex: 1 },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      renderCell: params => (
        <Button
          variant="contained"
          size="small"
          style={{ background: '#bae5d5', color: 'black' }}
          onClick={() => {
            console.log('params', params)
            router.push(`/admin/ventas/factura/${params.row.id}`)
          }}>
          Ver detalle
        </Button>
      ),
    },
  ]

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await getAllFacturas()

        const data = res.data.getAllFacturaWithDetails
        console.log('dataaa', data)
        const rows = data.map(({ factura, pago, detalles }) => ({
          id: factura.id_factura,
          factura: factura.id_factura,
          fecha: factura.fecha,
          total: factura.total,
          pago: pago.monto,
          items: detalles.reduce((sum, item) => sum + item.cantidad, 0),
        }))

        setFacturas(rows)
      } catch (err) {
        console.error('Error al cargar facturas:', err)
      }
    }

    fetchFacturas()
  }, [])

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <CustomTable
        title="Listado de facturas"
        rows={[...facturas].sort((a, b) => b.id - a.id)}
        columns={columns}
      />
    </div>
  )
}

export default withAdminAuth(page)
