'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './authContext'

const BackgroundColorContext = createContext()

// Hook personalizado para usar el contexto
export const useBackgroundColor = () => useContext(BackgroundColorContext)
// Proveedor del contexto
export function BackgroundColorProvider({ children }) {
  const { user } = useAuth()
  const [bgColor, setBgColor] = useState('bg-pink')
  const [textButtonColor, setTextButtonColor] = useState('text-pink')
  const [bgButtonColor, setBgButtonColor] = useState('text-pink')
  const [bgLightColors, setBgLightColores] = useState('bg-[#f5eaf4]')
  const [hoverBgColor, setHoverBgColor] = useState('hover:bg-[#f5eaf4]')
  const [hoverTextColor, setHoverTextColor] = useState('hover:text-pink-600')
  const [borderColor, setBordercolor] = useState('border-pink-300')

  useEffect(() => {
    // Actualizar el color según el tipo de usuario
    if (user?.tipo) {
      setBgColor('bg-lightgreen')
      setTextButtonColor('text-green')
      setBgButtonColor('bg-green')
      setBgLightColores('bg-[#eef9f5]')
      setHoverBgColor('hover:bg-[#eef9f5]')
      setHoverTextColor('hover:text-green-600')
      setBordercolor('border-green-300')
    } else {
      setBgColor('bg-pink')
      setTextButtonColor('text-pink')
      setBgButtonColor('bg-pink')
      setBgLightColores('bg-[#f5eaf4]')
      setHoverBgColor('hover:bg-[#f5eaf4]')
      setHoverTextColor('hover:text-pink-600')
      setBordercolor('border-pink-300')
    }
  }, [user?.tipo])

  return (
    <BackgroundColorContext.Provider
      value={{
        bgColor,
        textButtonColor,
        bgButtonColor,
        bgLightColors,
        hoverBgColor,
        hoverTextColor,
        borderColor,
      }}>
      {children}
    </BackgroundColorContext.Provider>
  )
}
4
