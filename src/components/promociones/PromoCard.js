'use client'

import { allProducts } from '@/app/signals/products'
import Link from 'next/link'

export default function PromoCard({ promo }) {
  const product = allProducts?.value?.find(
    product => product.id_ps === promo.id_ps,
  )

  if (!product) return null

  const originalPrice = product.precio
  const discountValue = promo.valor
  const discountedPrice = originalPrice - discountValue
  const discountPercentage = Math.round((discountValue / originalPrice) * 100)
  return (
    <Link href={`/product/${product.id_ps}`}>
      <div className="min-w-[160px] sm:min-w-[200px] cursor-pointer rounded-lg bg-[#fafafa] shadow shadow-xl/30 transition-all p-4">
        <img
          src={product.image || '/productImage.png'}
          alt={product.nombre}
          className="w-full h-36 sm:h-48 object-contain rounded"
        />
        <div className="mt-2 flex flex-col items-center text-center">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
            {product.nombre}
          </h3>
          <p className="text-gray-500 line-through font-semibold text-sm sm:text-base">
            ${originalPrice}
          </p>
          <p className="text-black font-bold text-lg sm:text-xl">
            ${discountedPrice}
          </p>
          <span className="mt-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        </div>
      </div>
    </Link>
  )
}
