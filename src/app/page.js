'use client'

import ProductCard from '@/components/product/ProductCard'
import { getAllProducts } from '@/lib/graphql/queries'
import { useEffect } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import { allProducts } from './signals/products'

export default function Home() {
  useSignals()

  const renderProducts = () => {
    return allProducts.value
      ?.filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((product, index) => <ProductCard key={index} product={product} />)
  }

  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl text-center font-bold">Products</h1>
        <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
          {renderProducts()}
        </div>
      </div>
    </div>
  )
}
