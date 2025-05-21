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

  useEffect(() => {
    // Actualizar el color según el tipo de usuario
    if (user?.tipo) {
      setBgColor('bg-lightgreen')
    } else {
      setBgColor('bg-pink')
    }
  }, [user?.tipo])

  return (
    <BackgroundColorContext.Provider value={{ bgColor }}>
      {children}
    </BackgroundColorContext.Provider>
  )
}
4
