'use client'

import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id_ps}`}>
      <div className="cursor-pointer rounded-lg bg-[#fafafa] shadow shadow-xl/30 transition-all p-4">
        <img
          src="/productImage.png"
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <div className="mt-2 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {product.nombre}
          </h3>
          <p>{product.descripcion}</p>
          <p className="font-bold">${product.precio}</p>
        </div>
      </div>
    </Link>
  )
}
