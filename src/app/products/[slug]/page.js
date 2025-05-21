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
import { FaEdit } from 'react-icons/fa'

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

  const renderEditButton = id_ps => {
    if (user && user.tipo) {
      return (
        <div className="p-4">
          <button
            type="button"
            onClick={() => router.push(`/editar-producto/${id_ps}`)}
            className="bg-lightgreen font-bold text-white px-4 py-2 rounded-md cursor-pointer h-max">
            Editar Producto
          </button>
        </div>
      )
    }
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
                <p>Precio: ${product.precio}</p>
                <div className="flex items-center gap-4">
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
      {renderEditButton(product?.id_ps)}
    </div>
  )
}
