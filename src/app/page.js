'use client'

import SearchAndUserBar from '@/components/bars/SearchAndUserBar'
import Footer from '@/components/footer/Footer'
import HeaderWithImage from '@/components/header/HeaderWithImage'
import ProductCard from '@/components/product/ProductCard'
import { handleSignIn } from '@/lib/auth'
import { getAllProducts, getPersonByEmail } from '@/lib/graphql/queries'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [products, setProducts] = useState()
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

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts()
      setProducts(response)
      console.log('response', response)
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderWithImage />
      <SearchAndUserBar session={session} />

      {/* CONTENIDO PRINCIPAL OPCIONAL */}
      <main className="flex-grow">
        <div className="my-6 mx-4">
          <h1 className="text-3xl text-center font-bold">Products</h1>
          <div className="w-full grid grid-cols-3 gap-4">
            {products?.map(product => {
              return <ProductCard product={product} />
            })}
          </div>
        </div>
      </main>

      {/* FOOTER PEGADO ABAJO */}
      <Footer />
    </div>
  )
}
