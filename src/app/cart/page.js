'use client'

import ProductCart from '@/components/product/ProductCart'
import {
  addToCart,
  getAllProductsCartById,
  getProductById,
  removeProductCart,
} from '@/lib/graphql'
import { useSignals } from '@preact/signals-react/runtime'

import React, { useEffect, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/navigation'
import {
  errorMessage,
  productSuccesfullyRemoved,
} from '../utils/toast/toastMessages'
import CustomButton from '@/components/inputs/CustomButton'

function page() {
  useSignals()
  const router = useRouter()
  const [productsCart, setProductsCart] = useState()
  const [total, setTotal] = useState(0)
  const { user } = useAuth()

  const updateTotal = amount => {
    setTotal(prev => prev + amount)
  }

  const getProductCarrito = async () => {
    const response = await getAllProductsCartById({
      id_carrito: user.id_persona,
    })
    if (response) {
      setProductsCart(response)
      const initialTotal = response.reduce(
        (acc, product) => acc + product.subtotal,
        0,
      )
      setTotal(initialTotal)
    }
  }
  useEffect(() => {
    user && getProductCarrito()
  }, [user])

  const removeProduct = async ({ id_pc }) => {
    const response = await removeProductCart({ id_pc: id_pc })
    if (response) {
      productSuccesfullyRemoved(response.message, getProductCarrito)
    } else {
      errorMessage('Algo ocurrio al intentar elminar el producto del carrito.')
    }
  }

  const handleClickBack = () => {
    router.push('/')
  }

  const handleClickContinueBuy = () => {
    //TO-DO: here i nedd to redirect mercado pago API
  }
  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      {productsCart?.length > 0 ? (
        <>
          {productsCart.map((product, index) => (
            <ProductCart
              key={index}
              productCart={product}
              updateTotal={updateTotal}
              removeProduct={removeProduct}
            />
          ))}

          <div className="text-bold text-4xl w-full">
            <h1 className="text-end p-6">Total: ${total}</h1>
          </div>

          <div className="w-full flex items-center justify-end gap-4 p-4">
            <CustomButton handleClick={handleClickBack} text="Volver" />
            <CustomButton handleClick={handleClickContinueBuy} text="Comprar" />
          </div>
        </>
      ) : (
        <div className="flex flex-col p-8 items-center justify-center gap-4">
          <h1>Tu carrito esta vacío</h1>
          <h1
            onClick={() => router.push('/')}
            className="cursor-pointer text-blue-500 underline">
            Ir de compras!
          </h1>
        </div>
      )}
    </div>
  )
}

export default page
