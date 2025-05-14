'use client'

import ProductCard from '@/components/product/ProductCard'
import { getAllProducts } from '@/lib/graphql/queries'
import { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'

export default function Home() {
  useSignals()
  const [products, setProducts] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts()
      setProducts(response)
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex justify-center">
      <div className="my-6 mx-4">
        <h1 className="text-3xl text-center font-bold">Products</h1>
        <div className="w-full grid grid-cols-3 gap-4">
          {products?.map((product, index) => {
            return <ProductCard key={index} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}
