import { allProducts } from '@/app/signals/products'
import { formatLocalDate } from '@/app/utils/date/date'
import Link from 'next/link'
import React from 'react'

export default function PromocionInfo({ promo }) {
  const product = allProducts.value.find(
    product => product.id_ps === promo.id_ps,
  )
  const formattedStartDate = formatLocalDate(new Date(promo.fecha_inicio))
  const formattedEndDate = formatLocalDate(new Date(promo.fecha_fin))

  return (
    <div className="bg-lightgreen rounded-xl p-6 shadow-md space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 ">Promoción</h2>

      <div className="flex sm:flex-row flex-col gap-6 items-center justify-around">
        <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt="Product"
              className="object-contain w-full h-full rounded-md"
            />
          ) : (
            <span className="text-gray-500">Sin foto del producto</span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:gap-8 gap-2 text-lg text-gray-700">
          <div>
            <p className="font-medium">Producto:</p>
            <p>{product?.nombre || 'Producto no encontrado'}</p>
          </div>

          <div>
            <p className="font-medium">Inicio:</p>
            <p>{formattedStartDate}</p>
          </div>

          <div>
            <p className="font-medium">Fin:</p>
            <p>{formattedEndDate}</p>
          </div>

          <div>
            <p className="font-medium">Descuento:</p>
            <p>${promo.valor}</p>
          </div>
          <div>
            <p className="font-medium">Promo Activa:</p>
            <p>{promo.activo ? 'Si' : 'No'}</p>
          </div>
        </div>
      </div>

      <div className="flex sm:justify-end justify-center">
        <Link
          href={`/admin/promociones/editar/${promo.id_promocion}`}
          className="bg-green-300 hover:bg-green-400 text-green-900 font-medium py-1.5 px-4 rounded-md transition-colors">
          Editar
        </Link>
      </div>
    </div>
  )
}
