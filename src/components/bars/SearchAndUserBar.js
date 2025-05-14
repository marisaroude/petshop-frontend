import React from 'react'
import SearchInput from '../inputs/SearchInput'
import UserMenu from '../menu/UserMenu'
import { UserIcon } from '@heroicons/react/16/solid'
import { useAuth } from '@/app/context/authContext'

export default function SearchAndUserBar() {
  const { user, handleSignIn } = useAuth()

  return (
    <div className="bg-pink w-full flex items-center justify-between p-4 text-black font-bold">
      {/* necesito la logica de buscar */}
      <SearchInput />
      <div className="flex items-center gap-4 ">
        {user ? (
          <p>
            {user.nombre} {user.apellido}
          </p>
        ) : (
          <div onClick={handleSignIn}>
            <p>Registrarse / Iniciar Sesión</p>
          </div>
        )}
        <UserIcon className="size-6 fill-black" />
        {user && <UserMenu />}
      </div>
    </div>
  )
}
