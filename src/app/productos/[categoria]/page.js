'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'
import { useParams } from 'next/navigation'
import { allProducts } from '@/app/signals/products'
import { categories } from '@/app/utils/data/categories'
import { useAuth } from '@/app/context/authContext'
import { getMascotaByPersonaId } from '@/lib/graphql'

export default function Page() {
  useSignals()
  const { categoria } = useParams()
  const { user } = useAuth()
  const products = allProducts.value
  const allowedCategories = categories.find(
    cat => cat.value === categoria.toLowerCase(),
  )?.value

  const [hasMascota, setHasMascota] = useState(false)

  if (!allowedCategories) return

  const today = new Date()

  const filterProducts =
    products?.length > 0 &&
    products
      .filter(product =>
        product.categoria?.trim().toLowerCase().includes(categoria),
      )
      .filter(product => product.activo && product.stock > 0)
      .filter(product => {
        if (product.categoria === 'servicios') {
          // Filtra que tenga al menos una fecha posterior o igual a hoy
          return product.fechas_servicios?.some(fechaStr => {
            const fecha = new Date(fechaStr)
            return fecha >= today
          })
        }
        return true
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
  useEffect(() => {
    if (!user) return

    const fetchMascotas = async () => {
      try {
        const response = await getMascotaByPersonaId({
          id_persona: user.id_persona,
        })
        const activas = response?.filter(item => item.fecha_baja == null) ?? []

        setHasMascota(activas.length > 0)
      } catch (error) {
        console.error('Error al obtener las mascotas.', error)
        setHasMascota(false)
      }
    }

    fetchMascotas()
  }, [user])
  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl mb-4 text-center font-bold capitalize">
          {categoria}
        </h1>
        {allowedCategories === 'servicios' && !hasMascota ? (
          <h1 className="p-6 text-center">
            Necesitás dar de alta al menos una mascota para contratar un
            servicio.
          </h1>
        ) : filterProducts.length > 0 ? (
          <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
            {filterProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <h1 className="p-6 text-center">No hay {categoria} disponibles</h1>
        )}
      </div>
    </div>
  )
}
