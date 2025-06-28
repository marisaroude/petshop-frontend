'use client'

import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id_ps}`} className="h-full">
      <div className="h-full flex flex-col justify-between cursor-pointer rounded-lg bg-[#fafafa] shadow shadow-xl/30 transition-all p-4">
        <img
          src={
            product.image ||
            (product.categoria === 'servicios'
              ? '/pets.png'
              : '/productImage.png')
          }
          alt={product.name}
          className="w-full h-48 object-contain rounded"
        />
        <div className="mt-2 flex flex-col items-center gap-1">
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            {product.nombre}
          </h3>
          <p className="text-center text-sm line-clamp-2">
            {product.descripcion}
          </p>
          <p className="font-bold">${product.precio}</p>
        </div>
      </div>
    </Link>
  )
}
