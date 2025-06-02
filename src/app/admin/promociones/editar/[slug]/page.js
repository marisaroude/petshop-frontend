'use client'
import React, { useEffect, useState } from 'react'
import PromocionForm from '@/components/forms/PromocionForm'
import { useSignals } from '@preact/signals-react/runtime'
import { useParams } from 'next/navigation'
import { getPromoById } from '@/lib/graphql'
import withAdminAuth from '@/app/utils/withAdminAuth'

function page() {
  useSignals()
  const { slug } = useParams()
  const [promo, setPromo] = useState(null)

  useEffect(() => {
    const fetchPromoById = async () => {
      const response = await getPromoById({ id_promocion: parseInt(slug) })
      setPromo(response)
    }
    fetchPromoById()
  }, [])
  return (
    <div className="bg-white h-full w-full flex flex-col p-6 items-center">
      <PromocionForm promo={promo} />
    </div>
  )
}

export default withAdminAuth(page)
