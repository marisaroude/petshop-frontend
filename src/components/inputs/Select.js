import React from 'react'

export default function Select({ label, register, error, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-black">{label}</label>
      <select
        {...register}
        className="bg-white text-black w-full rounded-md p-2">
        <option></option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  )
}
