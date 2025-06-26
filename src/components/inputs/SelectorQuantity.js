import React from 'react'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'

export default function SelectorQuantity({ setQuantity, quantity }) {
  const { bgColor } = useBackgroundColor()
  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const handleChange = e => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setQuantity(value === '' ? '' : Math.max(1, parseInt(value)))
    }
  }

  return (
    <div className="flex justify-center">
      <div
        className={`flex items-center ${bgColor} px-6 py-2 rounded-md space-x-4 w-[125px] justify-between`}>
        <button
          type="button"
          onClick={handleDecrement}
          className="text-white text-lg font-bold cursor-pointer  hover:opacity-80 focus:outline-none">
          –
        </button>
        <input
          type="text"
          disabled
          value={quantity}
          onChange={handleChange}
          className="w-6 text-center bg-transparent text-white text-base font-semibold focus:outline-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="text-white text-lg  cursor-pointer  font-bold hover:opacity-80 focus:outline-none">
          +
        </button>
      </div>
    </div>
  )
}
