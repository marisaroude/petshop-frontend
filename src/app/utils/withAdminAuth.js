'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/authContext'

const withAdminAuth = WrappedComponent => {
  const Wrapper = props => {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push('/')
      } else if (user && !user.tipo) {
        router.push('/')
      }
    }, [user, router])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAdminAuth
