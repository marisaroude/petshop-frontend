'use client'
import { currentUser } from '@/app/signals/user'
import SearchAndUserBar from '@/components/bars/SearchAndUserBar'
import Divider from '@/components/Divider'
import Footer from '@/components/footer/Footer'
import HeaderWithImage from '@/components/header/HeaderWithImage'
import ButtonAddToCart from '@/components/inputs/ButtonAddToCart'
import SelectorQuantity from '@/components/inputs/SelectorQuantity'
import { addToCart, getProductById } from '@/lib/graphql'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [quantity, setQuantity] = useState(1)

  const { data: session } = useSession()
  const [product, setProduct] = useState()
  const { slug } = useParams()
  console.log('currentUser.value', currentUser.value)
  const currentUserId = currentUser.value?.id_persona

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setProduct(response)
    }
    fetchProductById()
  }, [])

  const handleAddToCart = async () => {
    const subtotal = product.precio * quantity
    console.log({
      quantity,
      currentUserId,
      subtotal,
      slug,
    })
    const response = await addToCart({
      quantity: quantity,
      id_cart: parseInt(currentUserId),
      subtotal: subtotal,
      id_ps: parseInt(slug),
    })
    if (response) {
      console.log('añadido')
    }
  }
  return (
    <div className="flex flex-col min-h-screen items-center">
      <HeaderWithImage />
      <SearchAndUserBar session={session} />
      {/* CONTENIDO PRINCIPAL OPCIONAL */}
      <main className="flex-grow">
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
      </main>
      {/* FOOTER PEGADO ABAJO */}
      <Footer />
    </div>
  )
}
