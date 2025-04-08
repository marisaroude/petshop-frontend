import React from 'react'

export default function InputWithLabel({ label }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-black">{label}</h2>
      <input
        className="bg-white text-black w-full rounded-md p-2"
        placeholder={label}></input>
    </div>
  )
}
