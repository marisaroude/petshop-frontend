'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '@/components/forms/ProductForm'
import { getProductById, getUserById } from '@/lib/graphql'
import { useParams } from 'next/navigation'
import withAdminAuth from '@/app/utils/withAdminAuth'
import UserInfo from '@/components/users/UserInfo'
import UserForm from '@/components/forms/UserForm'

function page() {
  const { slug } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserById = async () => {
      const response = await getUserById({ id_persona: parseInt(slug) })
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

//To-do implemntar exportarlo con with admin auth
export default withAdminAuth(page)
