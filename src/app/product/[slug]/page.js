'use client'
import { useAuth } from '@/app/context/authContext'
import { allPromos } from '@/app/signals/promociones'
import {
  errorMessage,
  productSuccesfullyAdded,
} from '@/app/utils/toast/toastMessages'
import Divider from '@/components/Divider'
import ButtonAddToCart from '@/components/inputs/ButtonAddToCart'
import SelectorQuantity from '@/components/inputs/SelectorQuantity'
import { addToCart, getProductById } from '@/lib/graphql'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
function isVigente(promo) {
  const hoy = new Date()
  const inicio = new Date(promo.fecha_inicio)
  const fin = new Date(promo.fecha_fin)
  return hoy >= inicio && hoy <= fin
}
export default function page() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const [product, setProduct] = useState()
  const { slug } = useParams()
  const { user } = useAuth()

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setProduct(response)
    }
    fetchProductById()
  }, [])

  const handleAddToCart = async () => {
    const productPrice = product.precio
    const subtotal = productPrice * quantity
    const newProduct = {
      quantity: quantity,
      id_cart: parseInt(user.id_persona),
      subtotal: subtotal,
      id_ps: parseInt(slug),
    }

    const response = await addToCart(newProduct)

    if (response?.errors?.length > 0) {
      response.errors.forEach(error => errorMessage(error.message))
    } else {
      productSuccesfullyAdded(router)
    }
  }

  const promoActiva = allPromos.value?.find(
    promo => promo.id_ps === parseInt(slug) && isVigente(promo),
  )

  const precioOriginal = product?.precio
  const valorDescuento = promoActiva?.valor || 0
  const precioConDescuento = precioOriginal - valorDescuento
  const porcentajeDescuento = Math.round(
    (valorDescuento / precioOriginal) * 100,
  )

  const renderPrice = () => {
    return promoActiva ? (
      <div className="flex flex-col gap-1">
        <p className="text-sm text-green-700 font-semibold">
          ¡Este producto está en promoción!
        </p>
        <p className="line-through text-gray-500">${precioOriginal}</p>
        <p className="text-black text-xl font-bold">${precioConDescuento}</p>
        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded w-fit">
          {porcentajeDescuento}% OFF
        </span>
      </div>
    ) : (
      <p className="text-black text-xl font-bold">Precio: ${precioOriginal}</p>
    )
  }

  return (
    <div className="flex justify-around">
      <div className="p-8">
        {product ? (
          <div className="flex gap-4">
            <div className="flex flex-col gap-8">
              <img
                src={product.image || '/productImage.png'}
                alt={product.nombre}
                className="w-full h-48 object-contain rounded"
              />
              <Divider />

              <div className="flex flex-col gap-4">
                {renderPrice()}

                {!user?.tipo && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <p>Seleccione una cantidad</p>
                      <SelectorQuantity
                        setQuantity={setQuantity}
                        quantity={quantity}
                      />
                    </div>

                    <ButtonAddToCart handleClick={handleAddToCart} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{product.nombre}</h1>
              <p>{product.descripcion}</p>
            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}
      </div>
    </div>
  )
}
