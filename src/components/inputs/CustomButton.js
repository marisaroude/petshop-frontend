import React from 'react'

export default function CustomButton({
  handleClick,
  bgColor = 'bg-[#D7ACD4]',
  text,
}) {
  return (
    <div
      onClick={handleClick}
      className={`${bgColor} flex items-center w-fit cursor-pointer rounded-full px-6 py-6 h-[40px] text-white text-lg font-bold hover:opacity-80 focus:outline-none`}>
      <span>{text}</span>
    </div>
  )
}
