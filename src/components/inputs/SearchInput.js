import React from 'react'

export default function SearchInput({
  placeholder = 'Buscar...',
  onChange,
  value,
}) {
  return (
    <div className="flex items-center w-full max-w-md border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary">
      {/* <Search className="text-gray-500 mr-2 w-5 h-5" /> */}
      <svg
        className="w-4 h-4 mr-2 text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <input
        type="text"
        className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
