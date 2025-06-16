import { useRouter } from 'next/navigation'
import React from 'react'

export default function IconInfo({ info }) {
  const router = useRouter()
  return (
    <div className="p-8 w-[20%] h-max bg-[#D9D9D9] flex flex-col items-center gap-6 rounded-2xl">
      {info.icon}
      <p>{info.title}</p>
      <button
        onClick={() => router.push(`/admin/${info.route}`)}
        className="px-10 py-3 text-base font-semibold rounded bg-[#F0FF46] hover:bg-[#e6f400] hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
        Ver
      </button>
    </div>
  )
}
