'use client'
import { useAuth } from '@/app/context/authContext'
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

    if (response) {
      productSuccesfullyAdded(router)
    } else {
      errorMessage(
        'Algo ocurrió al intentar agregar el item al carrito. Por favor, intenta nuevamente',
      )
    }
  }
  return (
    <div className="flex justify-center">
      <div className="p-8">
        {product ? (
          <div className="flex gap-4">
            <div className="flex flex-col gap-8">
              <img
                src="/productImage.png"
                alt={product.nombre}
                className="w-full h-48 object-cover rounded"
              />
              <Divider />

              <div className="flex flex-col gap-4">
                <p>Precio: {product.precio}</p>
                <div className="flex items-center gap-2">
                  <p>Seleccione una cantidad</p>
                  <SelectorQuantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                  />
                </div>

                <ButtonAddToCart handleClick={handleAddToCart} />
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
