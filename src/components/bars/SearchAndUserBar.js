import React from 'react'
import SearchInput from '../inputs/SearchInput'
import { handleSignIn } from '@/lib/auth'
import UserMenu from '../menu/UserMenu'
import { UserIcon } from '@heroicons/react/16/solid'

export default function SearchAndUserBar({ session }) {
  return (
    <div className="bg-pink w-full flex items-center justify-between p-4 text-black font-bold">
      {/* necesito la logica de buscar */}
      <SearchInput />
      <div className="flex items-center gap-4 ">
        {session ? (
          <p>{session.user.name}</p>
        ) : (
          <div onClick={handleSignIn}>
            <p>Registrarse / Iniciar Sesión</p>
          </div>
        )}
        <UserIcon className="size-6 fill-black" />
        {session && <UserMenu />}
      </div>
    </div>
  )
}
