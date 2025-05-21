'use client'
import React from 'react'
import { allProducts } from '../signals/products'
import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'

export default function Page() {
  useSignals()
  const products = allProducts.value

  const onlyJuguetes =
    products?.length > 0 &&
    products
      ?.filter(product =>
        product.categoria?.trim().toLowerCase().includes('juguetes'),
      )
      .filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl text-center font-bold">Juguetes</h1>
        {onlyJuguetes.length > 0 ? (
          <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
            {onlyJuguetes?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <h1 className="p-6 text-center">No hay juguetes disponibles</h1>
        )}
      </div>
    </div>
  )
}
