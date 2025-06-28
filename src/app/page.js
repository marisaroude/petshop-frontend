'use client'

import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'
import { allProducts } from './signals/products'
import Promociones from '@/components/promociones/Promociones'
import { useBackgroundColor } from './context/backgroundColorContext'
import { allPromos } from './signals/promociones'
import { useState } from 'react'

function isVigente(promo) {
  const hoy = new Date()
  const inicio = new Date(promo.fecha_inicio)
  const fin = new Date(promo.fecha_fin)
  return hoy >= inicio && hoy <= fin
}

function isActive(promo) {
  return promo.activo
}
export default function Home() {
  useSignals()
  const { bgColor } = useBackgroundColor()
  const [visibleCount, setVisibleCount] = useState(9)

  const renderProducts = () => {
    const productsFiltered = allProducts.value
      ?.filter(
        product =>
          product.activo &&
          product.stock > 0 &&
          product.categoria !== 'servicios',
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre))

    const visibleProducts = productsFiltered?.slice(0, visibleCount)

    return (
      <>
        <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
          {visibleProducts?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        {visibleCount < productsFiltered?.length && (
          <div className="w-full flex justify-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
              Ver más
            </button>
          </div>
        )}
      </>
    )
    // .map((product, index) => <ProductCard key={index} product={product} />)
  }

  const promosVigentesYActivas = allPromos.value?.filter(
    promo => isVigente(promo) && isActive(promo),
  )

  return (
    <div className="flex justify-center flex-col">
      <div className="my-6 mx-4">
        {promosVigentesYActivas?.length > 0 && (
          <>
            <div className="w-full flex justify-center">
              <h1
                className={`w-[80%] px-8 py-2  shadow rounded ${bgColor} text-3xl text-center font-bold mb-6`}>
                Promociones Vigentes
              </h1>
            </div>
            <Promociones promos={promosVigentesYActivas} />
          </>
        )}
        <div className="w-full flex justify-center">
          <h1
            className={`w-[80%] px-8 py-2 shadow rounded ${bgColor} text-3xl text-center font-bold mb-6`}>
            Productos
          </h1>
        </div>
        {renderProducts()}
      </div>
    </div>
  )
}
