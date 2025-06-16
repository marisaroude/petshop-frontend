'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { allProducts } from '../signals/products'
import ProductCard from '@/components/product/ProductCard'
// import { allProducts } from '@/data/products' // si está disponible así

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase() || ''
  const [results, setResults] = useState([])

  useEffect(() => {
    if (query && allProducts.value?.length) {
      const filtered = allProducts.value.filter(
        p =>
          (p.nombre?.toLowerCase().includes(query) ||
            p.descripcion?.toLowerCase().includes(query) ||
            p.categoria?.toLowerCase().includes(query)) &&
          p.categoria !== 'servicios',
      )
      setResults(filtered)
    }
  }, [query, allProducts.value])

  const renderResults = () => {
    return results
      ?.filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((product, index) => <ProductCard key={index} product={product} />)
  }
  return (
    <div className="p-8">
      {query && (
        <h1 className="text-2xl font-bold mb-4">Resultados para: "{query}"</h1>
      )}

      {results?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {renderResults()}
        </div>
      ) : (
        <div className="text-center flex flex-col gap-2 p-6">
          <p>No se encontraron productos.</p>
          <p
            className="underline cursor-pointer"
            onClick={() => router.push('/')}>
            Ir al home
          </p>
        </div>
      )}
    </div>
  )
}
