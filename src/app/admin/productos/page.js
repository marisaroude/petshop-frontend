'use client'

import React, { useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { allProducts } from '@/app/signals/products'
import ProductInfo from '@/components/product/ProductInfo'

function isActive(product) {
  return product.activo
}

function hasFewProducts(product) {
  return product.stock < 10
}

function page() {
  useSignals()

  const [filtro, setFiltro] = useState('todos') // 'activos' | 'no activos' | 'todos'

  const productsFiltered = allProducts?.value
    ?.filter(product => {
      if (filtro === 'activos') return isActive(product)
      if (filtro === 'no activos') return !isActive(product)
      if (filtro === 'escasos') return hasFewProducts(product)

      return true
    })
    ?.sort((a, b) => b.id_ps - a.id_ps)

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex justify-end">
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
      {productsFiltered?.map((product, index) => (
        <div className="w-full" key={index}>
          <ProductInfo product={product} />
        </div>
      ))}
    </div>
  )
}

export default withAdminAuth(page)
