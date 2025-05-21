import React from 'react'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { useRouter } from 'next/navigation'
import { categories } from '@/app/utils/data/categories'

export default function CategoriesBar() {
  const router = useRouter()
  const { bgColor } = useBackgroundColor()

  return (
    <div
      className={`${bgColor} w-full flex justify-around text-xl p-4 text-white font-bold`}>
      {categories.map((cat, index) => {
        return (
          <div key={index}>
            <span
              className="cursor-pointer"
              onClick={() => router.push(`/${cat.value}`)}
              id={cat.value}>
              {cat.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
