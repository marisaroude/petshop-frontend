'use client'
import React from 'react'
import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'
import { useParams } from 'next/navigation'
import { allProducts } from '@/app/signals/products'
import { categories } from '@/app/utils/data/categories'

export default function Page() {
  useSignals()
  const { categoria } = useParams()
  const products = allProducts.value

  const allowedCategories = categories.find(
    cat => cat.value === categoria.toLowerCase(),
  )?.value

  if (!allowedCategories) return

  const filterProducts =
    products?.length > 0 &&
    products
      ?.filter(product =>
        product.categoria?.trim().toLowerCase().includes(categoria),
      )
      .filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))

  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl mb-4 text-center font-bold capitalize">
          {categoria}
        </h1>
        {filterProducts.length > 0 ? (
          <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
            {filterProducts?.map((product, index) => (
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
