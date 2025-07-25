'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import CustomTable from '@/components/table/CustomTable'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

import { pagosByPersona } from '@/lib/graphql'
import { allUsers } from '@/app/signals/user'
import { allMascotas } from '@/app/signals/mascota'

function page() {
  useSignals()
  const [clientes, setClientes] = useState([])
  const router = useRouter()

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellido', headerName: 'Apellido', flex: 1 },
    { field: 'correo_electronico', headerName: 'Email', flex: 1 },
    { field: 'telefono', headerName: 'Teléfono', flex: 1 },
    { field: 'mascotas', headerName: 'Mascotas', flex: 1 },
    { field: 'totalGastado', headerName: 'Total Gastado ($)', flex: 1 },
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
            router.push(`/admin/informe-clientes/detalle/${params.row.id}`)
          }}>
          Ver detalle
        </Button>
      ),
    },
  ]

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const personas = allUsers.value || []
        const mascotas = allMascotas.value || []

        const soloClientes = personas.filter(p => p.tipo === false)

        const ranking = await Promise.all(
          soloClientes.map(async cliente => {
            const pagos = await pagosByPersona({
              id_persona: cliente.id_persona,
            })

            const totalGastado = pagos.reduce(
              (acc, p) => acc + (p?.factura?.total || 0),
              0,
            )

            const mascotasDelCliente = mascotas.filter(
              m => m.id_persona === cliente.id_persona,
            )

            return {
              id: cliente.id_persona,
              nombre: cliente.nombre,
              apellido: cliente.apellido,
              correo_electronico: cliente.correo_electronico,
              telefono: cliente.telefono,
              totalGastado,
              mascotas: mascotasDelCliente.length,
            }
          }),
        )

        const ordenado = ranking.sort((a, b) => b.totalGastado - a.totalGastado)
        setClientes(ordenado)
      } catch (err) {
        console.error('Error al cargar clientes:', err)
      }
    }

    fetchClientes()
  }, [])

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <CustomTable title="Clientes" rows={clientes} columns={columns} />
    </div>
  )
}

export default withAdminAuth(page)
