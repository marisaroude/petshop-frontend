import React from 'react'

export default function InputWithLabel({
  type,
  item,
  register,
  error,
  isTextArea,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-black">{item.label}</label>
      {isTextArea ? (
        <textarea
          className="bg-white text-black w-full rounded-md p-2"
          {...register}
          placeholder={item.label}
        />
      ) : (
        <input
          type={type}
          className="bg-white text-black w-full rounded-md p-2"
          {...register}
          placeholder={item.label}
        />
      )}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
