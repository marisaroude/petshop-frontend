import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext'

const withoutAuth = WrappedComponent => {
  const Wrapper = props => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      // If the user is authenticated, redirect them to the login page
      if (user) {
        router.push('/')
      }
    }, [user, router])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withoutAuth
