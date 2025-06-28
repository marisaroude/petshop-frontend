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

  useEffect(() => {
    // Actualizar el color según el tipo de usuario
    if (user?.tipo) {
      setBgColor('bg-lightgreen')
      setTextButtonColor('text-green')
      setBgButtonColor('bg-green')
    } else {
      setBgColor('bg-pink')
      setTextButtonColor('text-pink')
      setBgButtonColor('bg-pink')
    }
  }, [user?.tipo])

  return (
    <BackgroundColorContext.Provider
      value={{ bgColor, textButtonColor, bgButtonColor }}>
      {children}
    </BackgroundColorContext.Provider>
  )
}
4
