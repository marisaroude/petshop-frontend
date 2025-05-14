'use client'
import { useEffect, useState } from 'react'
import SelectorQuantity from '../inputs/SelectorQuantity'
import { getProductById } from '@/lib/graphql'
import CustomButton from '../inputs/CustomButton'

export default function ProductCart({
  productCart,
  updateTotal,
  removeProduct,
}) {
  const [product, setProduct] = useState()
  const [subtotal, setSubtotal] = useState(productCart.subtotal)
  const [quantity, setQuantity] = useState(productCart.cantidad)

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: productCart.id_ps })
      if (response) {
        setProduct(response)
      }
    }
    fetchProductById()
  }, [])

  useEffect(() => {
    if (product) {
      const newSubtotal = product.precio * quantity
      const difference = newSubtotal - subtotal
      setSubtotal(newSubtotal)
      updateTotal(difference)
    }
  }, [quantity, product])

  return (
    <div className="flex flex-row w-full p-4 justify-around items-center gap-4">
      <div className="flex gap-2">
        <img
          src="/productImage.png"
          alt={product?.name}
          className=" h-48 object-contain rounded"
        />
        <div className="mt-2 flex flex-col items-start gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.nombre}
          </h3>
          <p className="font-bold">Subtotal: ${subtotal}</p>
          <div className="flex flex-row items-center gap-3">
            <p>Seleccione Cantidad</p>
            <SelectorQuantity quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>
      <div>
        <CustomButton
          handleClick={() =>
            removeProduct({
              id_pc: productCart.id_pc,
              id_ps: productCart.id_ps,
            })
          }
          bgColor={'#F0DFEF'}
          text="Quitar Producto"
        />
      </div>
    </div>
  )
}
