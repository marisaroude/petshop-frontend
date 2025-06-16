import React from 'react'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { useRouter } from 'next/navigation'
import { categories } from '@/app/utils/data/categories'

export default function CategoriesBar() {
  const router = useRouter()
  const { bgColor } = useBackgroundColor()

  return (
    <div
      className={`${bgColor} w-full flex gap-2 lg:flex-row flex-col items-center justify-around text-xl p-4 text-white font-bold`}>
      {categories.map((cat, index) => {
        return (
          <div key={index}>
            <span
              className="cursor-pointer"
              onClick={() => router.push(`/productos/${cat.value}`)}
              id={cat.value}>
              {cat.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
