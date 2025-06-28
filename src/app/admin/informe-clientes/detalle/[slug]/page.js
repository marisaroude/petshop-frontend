'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import { getPersonById, getMascotaByPersonaId } from '@/lib/graphql'

function DetalleClientePage() {
  const { slug } = useParams()
  const [cliente, setCliente] = useState(null)
  const [mascotas, setMascotas] = useState([])

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        // Traer datos del cliente
        const clienteData = await getPersonById({ id_persona: parseInt(slug) })
        setCliente(clienteData)

        // Traer mascotas del cliente
        const mascotasData = await getMascotaByPersonaId({
          id_persona: parseInt(slug),
        })
        setMascotas(mascotasData)
      } catch (err) {
        console.error('Error al cargar detalle del cliente:', err)
      }
    }

    fetchCliente()
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
            // {
            //   field: 'fecha_baja',
            //   headerName: 'Estado',
            //   flex: 1,
            // },
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
    </div>
  )
}

export default withAdminAuth(DetalleClientePage)
