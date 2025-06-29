'use client'

import React, { useEffect, useState } from 'react'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { useParams } from 'next/navigation'
import { getFacturaById } from '@/lib/graphql'
import CustomTable from '@/components/table/CustomTable'
import { getPersonById } from '@/lib/graphql'
import { allProducts } from '@/app/signals/products'

function FacturaDetailPage() {
  const { slug } = useParams()
  const [factura, setFactura] = useState(null)
  const [pago, setPago] = useState(null)
  const [detalles, setDetalles] = useState([])
  const [cliente, setCliente] = useState(null)

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const res = await getFacturaById({ id_factura: parseInt(slug) })
        const data = res.data.getFacturaWithDetailsById

        const { factura, pago, detalles } = data

        setFactura({
          id: factura.id_factura,
          fecha: factura.fecha,
          total: factura.total,
        })

        setPago({
          id: pago.id_pago,
          id_mercadopago: pago.id_mercadopago,
          id_carrito: pago.id_carrito,
          fecha_pago: pago.fecha,
          monto: pago.monto,
        })

        // Fetch cliente
        const clienteRes = await getPersonById({ id_persona: pago.id_carrito })
        setCliente(clienteRes)

        // Armar detalles con producto
        const detallesEnriquecidos = detalles.map(detalle => {
          const producto = allProducts.value.find(
            p => p.id_ps === detalle.id_ps,
          )
          return {
            id: detalle.id_df,
            cantidad: detalle.cantidad,
            subtotal: detalle.precio,
            fecha_servicio: detalle.fecha_servicio,
            ...producto,
          }
        })

        setDetalles(detallesEnriquecidos)
      } catch (err) {
        console.error('Error al cargar datos del Comprobante:', err)
      }
    }

    fetchFactura()
  }, [])

  return (
    <div className="flex flex-col gap-8 sm:p-4">
      <h1 className="text-2xl font-semibold">Comprobante #{factura?.id}</h1>

      {factura && pago && cliente && (
        <CustomTable
          title="Información del Cliente y Comprobante de Pago "
          rows={[
            {
              id: factura.id,
              fecha: factura.fecha,
              total: factura.total,
              pago_id: pago.id,
              fecha_pago: pago.fecha_pago,
              monto_pago: pago.monto,
              mercadopago: pago.id_mercadopago,
              cliente: `${cliente.nombre} ${cliente.apellido}`,
              email: cliente.correo_electronico,
            },
          ]}
          columns={[
            { field: 'id', headerName: 'Comprobante', flex: 1 },
            { field: 'fecha', headerName: 'Fecha', flex: 1 },
            { field: 'total', headerName: 'Total', flex: 1 },
            { field: 'monto_pago', headerName: 'Pago', flex: 1 },
            { field: 'fecha_pago', headerName: 'Fecha de Pago', flex: 1 },
            { field: 'mercadopago', headerName: 'ID MP', flex: 1 },
            { field: 'cliente', headerName: 'Cliente', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
          ]}
        />
      )}

      {detalles.length > 0 && (
        <CustomTable
          title="Productos comprados"
          rows={detalles.map(detalle => ({
            id: detalle.id,
            nombre: detalle.nombre,
            descripcion: detalle.descripcion,
            imagen: detalle.image,
            precioIndividual: detalle.precio,
            subtotal: detalle.subtotal,
            cantidad: detalle.cantidad,
            fecha_servicio: detalle.fecha_servicio,
          }))}
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            {
              field: 'imagen',
              headerName: 'Imagen',
              flex: 1,
              renderCell: params => {
                if (params.value) {
                  return (
                    <img
                      src={params.value || ''}
                      alt="img"
                      className="w-16 h-16 object-contain rounded "
                    />
                  )
                } else {
                  return <span>Sin imagen</span>
                }
              },
            },
            { field: 'nombre', headerName: 'Producto', flex: 2 },
            { field: 'descripcion', headerName: 'Descripción', flex: 3 },
            {
              field: 'precioIndividual',
              headerName: 'Precio Individual',
              flex: 1,
            },
            { field: 'subtotal', headerName: 'Subtotal', flex: 1 },

            { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
            {
              field: 'fecha_servicio',
              headerName: 'Fecha del servicio',
              flex: 1,
            },
          ]}
        />
      )}
    </div>
  )
}

export default withAdminAuth(FacturaDetailPage)
