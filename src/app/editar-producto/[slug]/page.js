'use client'
import React, { useEffect, useState } from 'react'
import ProductForm from '@/components/forms/ProductForm'
import { getProductById } from '@/lib/graphql'
import { useParams } from 'next/navigation'

function page() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setProduct(response)
    }
    fetchProductById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <ProductForm productInfo={product} />
    </div>
  )
}

//To-do implemntar exportarlo con with admin auth
export default page
