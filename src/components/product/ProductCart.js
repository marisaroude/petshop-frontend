'use client'
import { useEffect, useState } from 'react'
import SelectorQuantity from '../inputs/SelectorQuantity'
import { getProductById } from '@/lib/graphql'
import CustomButton from '../inputs/CustomButton'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'

export default function ProductCart({
  productCart,
  updateTotal,
  removeProduct,
  updateProductInCart,
}) {
  const { bgColor } = useBackgroundColor()
  const [lastValidQuantity, setLastValidQuantity] = useState(
    productCart.cantidad,
  )

  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(productCart.cantidad)

  const initialUnitPrice = useState(
    productCart.subtotal / productCart.cantidad,
  )[0]

  const [subtotal, setSubtotal] = useState(
    parseFloat(initialUnitPrice) * productCart.cantidad,
  )

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: productCart.id_ps })
      if (response) setProduct(response)
    }
    fetchProductById()
  }, [])

  useEffect(() => {
    const updateCart = async () => {
      let newSubtotal = parseFloat(initialUnitPrice) * quantity
      let difference = newSubtotal - subtotal

      setSubtotal(newSubtotal)
      updateTotal(difference)

      const updatedProduct = {
        ...productCart,
        cantidad: quantity,
        subtotal: newSubtotal,
      }
      const response = await updateProductInCart(updatedProduct)

      if (response?.errors?.length > 0) {
        // si falla, revertimos la cantidad subtotal y total
        setQuantity(lastValidQuantity)
        let newSubtotal = subtotal

        setSubtotal(newSubtotal)
        updateTotal(-difference)
      } else {
        // si fue exitoso, guardamos la cantidad válida
        setLastValidQuantity(quantity)
      }
    }

    if (quantity !== lastValidQuantity) {
      updateCart()
    }
  }, [quantity])

  return (
    <div className="flex sm:flex-row flex-col w-full p-4 px-8 justify-between items-end sm:gap-4 gap-2">
      <div className="flex gap-4 w-full">
        <img
          src={
            product?.image ||
            (product?.categoria === 'servicios'
              ? '/pets.png'
              : '/productImage.png')
          }
          alt={product?.name}
          className="w-48 h-48 object-contain rounded"
        />
        <div className="flex flex-col justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.nombre}
          </h3>
          <p className="font-bold">Subtotal: ${subtotal}</p>
          {productCart?.fecha_servicio && (
            <p className="font-bold">
              Fecha del servicio: {productCart.fecha_servicio}
            </p>
          )}
          <div className="flex sm:flex-row flex-col items-center gap-2">
            <p>Seleccione Cantidad</p>
            <SelectorQuantity quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>

      <div className="text-center flex sm:justify-end justify-center mt-4 sm:mt-0">
        <CustomButton
          handleClick={() =>
            removeProduct({
              id_pc: productCart.id_pc,
              id_ps: productCart.id_ps,
            })
          }
          text="Quitar Producto"
        />
      </div>
    </div>
  )
}
