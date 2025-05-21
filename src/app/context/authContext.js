// context/authContext.js
import { createContext, useState, useContext, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { getPersonByEmail } from '@/lib/graphql'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = useState(null)

  // Actualiza el usuario cuando cambia la sesión
  useEffect(() => {
    if (session?.user?.email) {
      const checkIfPersonExists = async () => {
        try {
          const response = await getPersonByEmail({ email: session.user.email })
          if (!response) {
            router.push('/complete-profile')
          } else {
            setUser(response)
          }
        } catch (err) {
          console.error('Error fetching person:', err)
        }
      }
      checkIfPersonExists()
    } else {
      setUser(null)
    }
  }, [session])

  // Manejo de inicio de sesión
  const handleSignIn = async () => {
    try {
      await signIn('google')
    } catch (error) {
      console.error('Error in login:', error)
    }
  }

  // Manejo de cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      console.error('Error in logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
