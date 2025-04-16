'use client'
import { getProductById } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [product, setProduct] = useState()
  const { slug } = useParams()

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setProduct(response)
    }
    fetchProductById()
  }, [])

  return (
    <div className="p-8">
      {product ? (
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">{product.nombre}</h1>
          <p className="mb-2">{product.descripcion}</p>
          <p className="text-lg font-semibold">${product.precio}</p>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  )
}
