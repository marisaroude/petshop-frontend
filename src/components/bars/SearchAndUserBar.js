import React, { useEffect, useState } from 'react'
import SearchInput from '../inputs/SearchInput'
import UserMenu from '../menu/UserMenu'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/16/solid'
import { useAuth } from '@/app/context/authContext'
import AdminMenu from '../menu/AdminMenu'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { useSignals } from '@preact/signals-react/runtime'
import { usePathname, useRouter } from 'next/navigation'
import { allProductsCart } from '@/app/signals/cart'

export default function SearchAndUserBar() {
  useSignals()
  const pathname = usePathname()
  const { user, handleSignIn } = useAuth()
  const { bgColor } = useBackgroundColor()
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = e => {
    const newValue = e.target.value
    setSearchValue(newValue)
    if (newValue.trim() === '') {
      router.push('/')
    } else {
      router.push(`/search?q=${encodeURIComponent(newValue)}`)
    }
  }

  const totalItemsCart = allProductsCart.value?.reduce(
    (total, item) => total + item.cantidad,
    0,
  )

  const renderCartIcon = () => {
    return (
      <div
        className="relative cursor-pointer "
        onClick={() => router.push('/cart')}>
        <ShoppingCartIcon className="size-6 fill-black" />
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-xs flex items-center justify-center border border-black">
          {totalItemsCart || 0}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (pathname === '/') setSearchValue('')
  }, [pathname])

  return (
    <div
      className={`${bgColor} w-full flex flex-col sm:flex sm:flex-row items-center  gap-2 justify-between p-4 text-black font-bold`}>
      <SearchInput value={searchValue} onChange={handleSearchChange} />
      <div className="flex sm:items-center capitalize justify-end gap-4 w-full">
        {user ? (
          <p>
            {user.nombre} {user.apellido}
          </p>
        ) : (
          <div className="cursor-pointer" onClick={handleSignIn}>
            <p>Registrarse / Iniciar Sesión</p>
          </div>
        )}
        {user && (
          <div className="flex gap-2 items-center">
            <UserIcon className="size-6 fill-black" />
            {/* TO-DO: remover esto si se implementa que el admin pueda agregar al carrito */}
            {!user?.tipo && renderCartIcon()}
            {user?.tipo ? <AdminMenu /> : <UserMenu />}
          </div>
        )}
      </div>
    </div>
  )
}
