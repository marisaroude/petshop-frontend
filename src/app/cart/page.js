'use client'

import React, { useEffect, useState } from 'react'
import ProductCart from '@/components/product/ProductCart'
import { removeProductCart, updateProductCart } from '@/lib/graphql'
import { useSignals } from '@preact/signals-react/runtime'
import { useRouter } from 'next/navigation'
import {
  errorMessage,
  productSuccesfullyRemoved,
} from '../utils/toast/toastMessages'
import CustomButton from '@/components/inputs/CustomButton'
import BigSpinner from '@/components/spinner/BigSpinner'
import ModalRedirectMP from '@/components/modal/ModalRedirectMP'
import withUserAuth from '../utils/withUserAuth'
import { useProductsCart } from '../hooks/useProductsCart'

function page() {
  useSignals()
  const router = useRouter()
  const { handleProductsCart, handleRemoveProduct, productsCart } =
    useProductsCart()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [total, setTotal] = useState(0)

  const updateTotal = amount => {
    setTotal(prev => prev + amount)
  }

  const removeProduct = async ({ id_pc }) => {
    const response = await removeProductCart({ id_pc: id_pc })
    if (response) {
      handleRemoveProduct(id_pc)
      productSuccesfullyRemoved(response.message)

      const newTotal = productsCart.value?.reduce(
        (acc, p) => acc + p.subtotal,
        0,
      )
      setTotal(newTotal)
    } else {
      errorMessage('Algo ocurrio al intentar elminar el producto del carrito.')
    }
  }

  const updateProductInCart = async product => {
    handleProductsCart(product)

    await updateProductCart({
      id_pc: product.id_pc,
      input: {
        quantity: product.cantidad,
        subtotal: product.subtotal,
        id_ps: product.id_ps,
        id_cart: product.id_carrito,
      },
    })
  }

  useEffect(() => {
    if (productsCart.value?.length > 0) {
      const initialTotal = productsCart.value.reduce(
        (acc, product) => acc + product.subtotal,
        0,
      )
      setTotal(initialTotal)
    }
  }, [productsCart.value])

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      {loading && <BigSpinner />}
      <ModalRedirectMP
        productsCart={productsCart.value}
        setLoading={setLoading}
        loading={loading}
        setOpen={setOpen}
        open={open}
      />
      {productsCart.value?.length > 0 ? (
        <>
          {productsCart.value.map((product, index) => (
            <div
              key={product.id_pc}
              className={`py-4 ${
                index !== productsCart.value.length - 1
                  ? 'border-b border-gray-300'
                  : ''
              }`}>
              <ProductCart
                productCart={product}
                updateTotal={updateTotal}
                removeProduct={removeProduct}
                updateProductInCart={updateProductInCart}
              />
            </div>
          ))}

          <div className="text-bold text-4xl w-full">
            <h1 className="sm:text-end text-center p-6">Total: ${total}</h1>
          </div>

          <div className="w-full flex items-center sm:justify-end justify-center gap-4 p-4">
            <CustomButton handleClick={() => router.push('/')} text="Volver" />
            <CustomButton handleClick={() => setOpen(true)} text="Comprar" />
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

export default withUserAuth(page)
