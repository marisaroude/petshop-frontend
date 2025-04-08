'use client'
import SimpleHeader from '@/components/header/SimpleHeader'
import { handleSignIn, handleSignOut } from '../../lib/auth'
import { useSession } from 'next-auth/react'
import { getPersonByEmail } from '@/lib/graphql/queries'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.user?.email) {
      const checkIfPersonExists = async () => {
        try {
          const response = await getPersonByEmail({ email: session.user.email })
          if (!response) {
            router.push('/complete-profile')
          }
        } catch (err) {
          console.error('Error fetching person:', err)
        }
      }

      checkIfPersonExists()
    }
  }, [session, router])
  return (
    <div className=" items-center justify-center min-h-screen bg-gray-100">
      <SimpleHeader />
      {session ? (
        <div>
          <h2 className="text-lg font-medium text-gray-700">
            Welcome, {session.user.name}!
          </h2>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600">
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Sign in with Google
        </button>
      )}
    </div>
  )
}
