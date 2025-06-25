import React from 'react'
import { useAuth } from '@/app/context/authContext'
import {
  errorMessage,
  productsSuccesfullyAdded,
} from '@/app/utils/toast/toastMessages'
import { addToCart } from '@/lib/graphql'
import { useRouter } from 'next/navigation'
import { useProductsCart } from '@/app/hooks/useProductsCart'

export default function PurchasedItem({ purchase }) {
  const { user } = useAuth()
  const { handleProductsCart } = useProductsCart()

  const { pago, factura } = purchase
  const { detalles_factura, fecha, total } = factura
  const router = useRouter()
  const handleReorder = async () => {
    try {
      const responses = await Promise.all(
        detalles_factura.map(item =>
          addToCart({
            id_ps: item.producto_servicio.id_ps,
            quantity: item.cantidad,
            subtotal: item.producto_servicio.precio * item.cantidad,
            id_cart: parseInt(user.id_persona, 10),
          }),
        ),
      )

      const errors = responses.flatMap(res => res?.errors || [])
      if (errors.length > 0) {
        errors.forEach(error => errorMessage(error.message))
      } else {
        responses.map(res => handleProductsCart(res.data.createProductoCarrito))
        productsSuccesfullyAdded(router)
      }
    } catch (err) {
      errorMessage('An unexpected error occurred.')
      console.error(err)
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Compra realizada el {fecha}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {detalles_factura.map(item => {
          const producto = item.producto_servicio
          const subtotal = Number(item.producto_servicio.precio) * item.cantidad

          return (
            <div
              key={item.id_df}
              className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
              <img
                src={
                  producto.image ||
                  (producto.categoria === 'servicios'
                    ? '/pets.png'
                    : '/productImage.png')
                }
                alt={producto.nombre}
                className="h-40 object-contain rounded mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {producto.nombre}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Precio unitario: ${producto.precio}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Cantidad: {item.cantidad}
              </p>
              <p className="font-semibold text-gray-800 mt-2">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-gray-900">
            Total de la factura: ${total.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Pago ID: {pago.id_pago}</p>
        </div>

        <button
          onClick={handleReorder}
          className="bg-pink-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          Volver a comprar
        </button>
      </div>
    </div>
  )
}
