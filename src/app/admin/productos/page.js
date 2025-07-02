'use client'

import React, { useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { allProducts } from '@/app/signals/products'
import ProductInfo from '@/components/product/ProductInfo'
import SearchInput from '@/components/inputs/SearchInput'

function isActive(product) {
  return product.activo
}

function hasFewProducts(product) {
  return product.stock < 10
}

function page() {
  useSignals()

  const [filtro, setFiltro] = useState('todos') // 'activos' | 'no activos' | 'todos'
  const [visibleCount, setVisibleCount] = useState(5)
  const [searchValue, setSearchValue] = useState('')

  const productsFiltered = allProducts?.value
    ?.filter(product => {
      if (filtro === 'activos') return isActive(product)
      if (filtro === 'no activos') return !isActive(product)
      if (filtro === 'escasos') return hasFewProducts(product)
      return true
    })
    ?.filter(product => {
      const query = searchValue.toLowerCase()
      return (
        product.nombre?.toLowerCase().includes(query) ||
        product.descripcion?.toLowerCase().includes(query) ||
        product.categoria?.toLowerCase().includes(query)
      )
    })
    ?.sort((a, b) => b.id_ps - a.id_ps)

  const visibleProducts = productsFiltered?.slice(0, visibleCount)

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex  flex-col sm:flex-row justify-between gap-2">
        <SearchInput
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activos">Solo activos</option>
          <option value="no activos">Solo no activos</option>
          <option value="escasos">Escasos</option>
        </select>
      </div>
      <h1 className="text-3xl">Listado de Productos</h1>
      {visibleProducts?.map((product, index) => (
        <div className="w-full" key={index}>
          <ProductInfo product={product} />
        </div>
      ))}

      {visibleCount < productsFiltered?.length && (
        <button
          onClick={() => setVisibleCount(prev => prev + 5)}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
          Ver más
        </button>
      )}
    </div>
  )
}

export default withAdminAuth(page)
