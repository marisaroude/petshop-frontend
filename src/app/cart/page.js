'use client'

import React, { useEffect, useState } from 'react'
import ProductCart from '@/components/product/ProductCart'
import { getAllProductsCartById, removeProductCart } from '@/lib/graphql'
import { useSignals } from '@preact/signals-react/runtime'
import { useAuth } from '../context/authContext'
import { useRouter } from 'next/navigation'
import {
  errorMessage,
  productSuccesfullyRemoved,
} from '../utils/toast/toastMessages'
import CustomButton from '@/components/inputs/CustomButton'
import BigSpinner from '@/components/spinner/BigSpinner'
import ModalRedirectMP from '@/components/modal/ModalRedirectMP'
import withUserAuth from '../utils/withUserAuth'

function page() {
  useSignals()
  const router = useRouter()
  const [productsCart, setProductsCart] = useState()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
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

  const removeProduct = async ({ id_pc }) => {
    const response = await removeProductCart({ id_pc: id_pc })
    if (response) {
      productSuccesfullyRemoved(response.message, getProductCarrito)
    } else {
      errorMessage('Algo ocurrio al intentar elminar el producto del carrito.')
    }
  }

  const updateProductInCart = (id_pc, updatedFields) => {
    setProductsCart(prev =>
      prev.map(product =>
        product.id_pc === id_pc ? { ...product, ...updatedFields } : product,
      ),
    )
  }

  useEffect(() => {
    user && getProductCarrito()
  }, [user])

  return (
    <div className="flex flex-col items-center justify-between w-full h-full">
      {loading && <BigSpinner />}
      <ModalRedirectMP
        productsCart={productsCart}
        setLoading={setLoading}
        loading={loading}
        setOpen={setOpen}
        open={open}
      />
      {productsCart?.length > 0 ? (
        <>
          {productsCart.map((product, index) => (
            <ProductCart
              key={index}
              productCart={product}
              updateTotal={updateTotal}
              removeProduct={removeProduct}
              updateProductInCart={updateProductInCart}
            />
          ))}

          <div className="text-bold text-4xl w-full">
            <h1 className="text-end p-6">Total: ${total}</h1>
          </div>

          <div className="w-full flex items-center justify-end gap-4 p-4">
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
