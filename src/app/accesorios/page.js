'use client'
import React from 'react'
import { allProducts } from '../signals/products'
import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'

export default function Page() {
  useSignals()
  const products = allProducts.value

  console.log('PRODUCTS', products)
  // Filtrar productos accesorios directamente
  const onlyAccesorios =
    products?.length > 0 &&
    products
      ?.filter(product =>
        product.categoria?.trim().toLowerCase().includes('accesorios'),
      )
      .filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))

  console.log('onlyAccesorios', onlyAccesorios)
  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl text-center font-bold">Accesorios</h1>
        {onlyAccesorios?.length > 0 ? (
          <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
            {onlyAccesorios?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <h1 className="p-6 text-center">No hay accesorios disponibles</h1>
        )}
      </div>
    </div>
  )
}
