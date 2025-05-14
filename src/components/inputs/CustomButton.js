import React from 'react'

export default function CustomButton({
  handleClick,
  bgColor = '#D7ACD4',
  text,
}) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
      className={`flex items-center w-fit  rounded-full px-6 py-6 h-[40px] text-white text-lg font-bold hover:opacity-80 focus:outline-none`}>
      <span>{text}</span>
    </div>
  )
}
