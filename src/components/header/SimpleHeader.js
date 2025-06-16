import React from 'react'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'

export default function SimpleHeader() {
  const { bgColor } = useBackgroundColor()
  return (
    <div
      className={`${bgColor} py-4 px-6 flex justify-center shadow-lg w-full`}>
      <img src="/LOGO-puppis.png" alt="logo" className="h-20" />
    </div>
  )
}
