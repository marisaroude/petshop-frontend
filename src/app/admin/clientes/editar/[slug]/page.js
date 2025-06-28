'use client'
import React, { useEffect, useState } from 'react'
import { getPersonById } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import UserForm from '@/components/forms/UserForm'

function page() {
  const { slug } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserById = async () => {
      const response = await getPersonById({ id_persona: parseInt(slug) })
      setUser(response)
    }
    fetchUserById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <UserForm user={user} />
    </div>
  )
}

export default withAdminAuth(page)
