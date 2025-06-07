'use client'

import ProductCard from '@/components/product/ProductCard'
import { useSignals } from '@preact/signals-react/runtime'
import { allProducts } from './signals/products'
import Promociones from '@/components/promociones/Promociones'
import { useBackgroundColor } from './context/backgroundColorContext'
import { allPromos } from './signals/promociones'

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

  const renderProducts = () => {
    return allProducts.value
      ?.filter(product => product.activo && product.stock > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((product, index) => <ProductCard key={index} product={product} />)
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
        <div className="w-full sm:grid sm:grid-cols-3 flex flex-col gap-4">
          {renderProducts()}
        </div>
      </div>
    </div>
  )
}
