import React from 'react'
import Link from 'next/link'

export default function ProductInfo({ product }) {
  if (!product) return <></>
  return (
    <div className="bg-lightgreen rounded-xl p-8 shadow-md max-w-4xl space-y-4 w-full mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 ">Producto</h2>

      <div className="flex flex-row gap-6 w-full justify-start items-start">
        <div className="flex flex-row w-full gap-6 justify-start items-start">
          <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center text-center text-sm text-gray-500 px-2">
            {product.image ? (
              <img
                src={product.image}
                alt="Product"
                className="object-contain w-full h-full rounded-md"
              />
            ) : (
              <span>Sin foto del producto</span>
            )}
          </div>

          {/* Información del producto */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 w-full">
            <p className="font-semibold">Nombre:</p>
            <p>{product.nombre}</p>

            <p className="font-semibold">Precio:</p>
            <p>${product.precio}</p>

            <p className="font-semibold">Stock:</p>
            <p>{product.stock}</p>

            <p className="font-semibold">Descripcion:</p>
            <p>{product.descripcion}</p>

            <p className="font-semibold">Categoria:</p>
            <p>{product.categoria}</p>

            <p className="font-semibold">Producto Activo:</p>
            <p>{product.activo ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/admin/productos/editar/${product.id_ps}`}
          className="bg-green-300 hover:bg-green-400 text-green-900 font-medium py-1.5 px-4 rounded-md transition-colors">
          Editar Producto
        </Link>
      </div>
    </div>
  )
}
