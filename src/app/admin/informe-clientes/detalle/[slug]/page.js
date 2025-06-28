'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import { useSignals } from '@preact/signals-react/runtime'
import { allUsers } from '@/app/signals/user'
import { allMascotas } from '@/app/signals/mascota'
import { getAllFacturas } from '@/lib/graphql'
import { allProducts } from '@/app/signals/products'

function DetalleClientePage() {
  useSignals()
  const { slug } = useParams()
  const [cliente, setCliente] = useState(null)
  const [mascotas, setMascotas] = useState([])
  const [productosComprados, setProductosComprados] = useState([])

  useEffect(() => {
    if (slug && allUsers.value && allMascotas.value) {
      const clienteData = allUsers.value.find(
        u => u.id_persona === parseInt(slug),
      )
      setCliente(clienteData)

      const mascotasData = allMascotas.value.filter(
        m => m.id_persona === parseInt(slug),
      )
      setMascotas(mascotasData)
    }
  }, [slug, allUsers.value, allMascotas.value])

  useEffect(() => {
    const fetchProductosComprados = async () => {
      try {
        const res = await getAllFacturas()
        const facturas = res.data.getAllFacturaWithDetails

        const facturasCliente = facturas.filter(
          f => f.pago.id_carrito === parseInt(slug),
        )

        const productosMap = {}

        facturasCliente.forEach(factura => {
          factura.detalles.forEach(detalle => {
            const producto = allProducts.value.find(
              p => p.id_ps === detalle.id_ps,
            )

            if (producto) {
              if (!productosMap[producto.id_ps]) {
                productosMap[producto.id_ps] = {
                  id: producto.id_ps,
                  nombre: producto.nombre,
                  imagen: producto.image,
                  vecesComprado: 0,
                  cantidadTotal: 0,
                  gastoTotal: 0,
                }
              }

              productosMap[producto.id_ps].vecesComprado += 1
              productosMap[producto.id_ps].cantidadTotal += detalle.cantidad
              productosMap[producto.id_ps].gastoTotal +=
                detalle.precio * detalle.cantidad
            }
          })
        })

        setProductosComprados(Object.values(productosMap))
      } catch (err) {
        console.error('Error al cargar productos comprados:', err)
      }
    }

    if (slug) {
      fetchProductosComprados()
    }
  }, [slug])

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-semibold">
        Detalle de {cliente?.nombre} {cliente?.apellido}
      </h1>

      {cliente && (
        <CustomTable
          title="Información del Cliente"
          rows={[
            {
              id: cliente.id_persona,
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              email: cliente.correo_electronico,
              telefono: cliente.telefono,
            },
          ]}
          columns={[
            { field: 'nombre', headerName: 'Nombre', flex: 1 },
            { field: 'apellido', headerName: 'Apellido', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 2 },
            { field: 'telefono', headerName: 'Teléfono', flex: 1 },
          ]}
        />
      )}

      {mascotas.length > 0 && (
        <CustomTable
          title="Mascotas"
          rows={mascotas.map(m => ({
            id: m.id_mascota,
            nombre: m.nombre,
            descripcion: m.descripcion,
            imagen: m.image,
            fecha_baja: m.fecha_baja ? m.fecha_baja : 'Activa',
          }))}
          columns={[
            { field: 'nombre', headerName: 'Nombre', flex: 1 },
            { field: 'descripcion', headerName: 'Descripción', flex: 2 },
            {
              field: 'fecha_baja',
              headerName: 'Estado Mascota',
              flex: 1,
            },
            {
              field: 'imagen',
              headerName: 'Imagen',
              flex: 1,
              renderCell: params =>
                params.value ? (
                  <img
                    src={params.value}
                    alt="Mascota"
                    className="w-16 h-16 object-contain rounded"
                  />
                ) : (
                  <span>Sin imagen</span>
                ),
            },
          ]}
        />
      )}

      {productosComprados.length > 0 && (
        <CustomTable
          title="Productos Comprados"
          rows={productosComprados}
          columns={[
            { field: 'nombre', headerName: 'Producto', flex: 2 },
            {
              field: 'imagen',
              headerName: 'Imagen',
              flex: 1,
              renderCell: params =>
                params.value ? (
                  <img
                    src={params.value}
                    alt="Producto"
                    className="w-16 h-16 object-contain rounded"
                  />
                ) : (
                  <span>Sin imagen</span>
                ),
            },
            {
              field: 'vecesComprado',
              headerName: 'Cantidad Veces Comprado',
              flex: 1,
            },
            {
              field: 'cantidadTotal',
              headerName: 'Cantidad Vendida (Total)',
              flex: 1,
            },
            { field: 'gastoTotal', headerName: 'Total Gastado ($)', flex: 1 },
          ]}
        />
      )}
    </div>
  )
}

export default withAdminAuth(DetalleClientePage)
