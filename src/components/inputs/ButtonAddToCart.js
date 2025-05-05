import { ShoppingCartIcon } from '@heroicons/react/16/solid'
import React from 'react'

export default function ButtonAddToCart({ handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="flex items-center w-fit gap-2 bg-[#20A920] rounded-full px-4 h-[40px] text-white text-lg font-bold hover:opacity-80 focus:outline-none">
      <ShoppingCartIcon className="size-4 fill-white" />
      <span>Añadir al carrito</span>
    </div>
  )
}
