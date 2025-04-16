import React from 'react'

export default function InputWithLabel({ item, register, error }) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="text-black">{item.label}</label>
      <input
        className="bg-white text-black w-full rounded-md p-2"
        {...register}
        placeholder={item.label}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
