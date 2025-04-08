'use client'
// import SimpleHeader from '@/components/header/SimpleHeader'
// import { handleSignIn, handleSignOut } from '../lib/auth'
// import { useSession } from 'next-auth/react'

export default function Home() {
  // const { data: session } = useSession()

  // console.log(session && session)
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* <SimpleHeader />
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
      )} */}
      <a className="text-black" href="/login">
        {' '}
        Go to Login
      </a>
    </main>
  )
}
