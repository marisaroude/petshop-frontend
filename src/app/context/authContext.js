// context/authContext.js
import { createContext, useState, useContext, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { getPersonByEmail } from '@/lib/graphql'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  // Actualiza el usuario cuando cambia la sesión
  useEffect(() => {
    const checkUser = async () => {
      if (session?.user?.email) {
        try {
          const person = await getPersonByEmail({ email: session.user.email })
          setUser(person)
        } catch (err) {
          console.error('Error fetching person:', err)
        }
      }
      setLoading(false)
    }

    if (status !== 'loading' || status === 'unauthenticated') {
      checkUser()
    }
  }, [session, status])

  // Manejo de inicio de sesión
  const handleSignIn = async () => {
    try {
      if (status === 'authenticated' && !user) {
        return await signIn('google', { callbackUrl: '/complete-profile' })
      }
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
    <AuthContext.Provider
      value={{ user, handleSignIn, handleSignOut, setUser }}>
      {loading ? <FullScreenLoader /> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// Loader global
const FullScreenLoader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div
      className="w-16 h-16 border-4 border-white  rounded-full animate-spin"
      style={{ borderStyle: 'inset' }}
    />
  </div>
)
