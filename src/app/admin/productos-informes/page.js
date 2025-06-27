'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import Button from '@mui/material/Button'
import { getAllSalesQuantityProduct } from '@/lib/graphql'
import { useRouter } from 'next/navigation'

function page() {
  useSignals()
  const [salesProducts, setSalesProducts] = useState([])
  const router = useRouter()
  const columns = [
    { field: 'producto', headerName: 'Producto', flex: 1 },
    { field: 'precioIndividual', headerName: 'Precio Individual', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'cantidad_ventas', headerName: 'Cantidad de Ventas', flex: 1 },
    { field: 'total_facturado', headerName: 'Total Facturado', flex: 1 },
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
            router.push(
              `/admin/productos-informes/ingresos-producto/${params.row.id}`,
            )
          }}>
          Ver ingresos
        </Button>
      ),
    },
  ]

  useEffect(() => {
    const fetchProductsInfo = async () => {
      try {
        const data = await getAllSalesQuantityProduct()

        const rows = data.map(
          ({ id_ps, producto, cantidad_ventas, total_facturado }) => ({
            id: id_ps,
            producto: producto.nombre,
            precioIndividual: producto.precio,
            stock: producto.stock,
            cantidad_ventas,
            total_facturado,
          }),
        )

        setSalesProducts(rows)
      } catch (err) {
        console.error('Error al cargar facturas:', err)
      }
    }

    fetchProductsInfo()
  }, [])

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <CustomTable
        title="Informe de productos vendidos"
        rows={[...salesProducts].sort(
          (a, b) => b.cantidad_ventas - a.cantidad_ventas,
        )}
        columns={columns}
      />
    </div>
  )
}

export default withAdminAuth(page)
