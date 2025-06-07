import React, { useEffect, useState } from 'react'
import SearchInput from '../inputs/SearchInput'
import UserMenu from '../menu/UserMenu'
import { UserIcon } from '@heroicons/react/16/solid'
import { useAuth } from '@/app/context/authContext'
import AdminMenu from '../menu/AdminMenu'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import {
  allProducts,
  resultSearch,
  searchingProducts,
} from '@/app/signals/products'
import { useSignals } from '@preact/signals-react/runtime'
import { usePathname, useRouter } from 'next/navigation'

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

  useEffect(() => {
    if (pathname === '/') setSearchValue('')
  }, [pathname])
  return (
    <div
      className={`${bgColor} w-full flex flex-col sm:flex sm:flex-row items-center  gap-2 justify-between p-4 text-black font-bold`}>
      {/* necesito la logica de buscar */}
      <SearchInput value={searchValue} onChange={handleSearchChange} />
      <div className="flex sm:items-center justify-end gap-4 w-full">
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
            {user?.tipo ? <AdminMenu /> : <UserMenu />}
          </div>
        )}
      </div>
    </div>
  )
}
