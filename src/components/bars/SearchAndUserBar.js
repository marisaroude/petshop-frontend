import React from 'react'
import SearchInput from '../inputs/SearchInput'
import UserMenu from '../menu/UserMenu'
import { UserIcon } from '@heroicons/react/16/solid'
import { useAuth } from '@/app/context/authContext'
import AdminMenu from '../menu/AdminMenu'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'

export default function SearchAndUserBar() {
  const { user, handleSignIn } = useAuth()
  const { bgColor } = useBackgroundColor()

  return (
    <div
      className={`${bgColor} w-full flex flex-col sm:flex sm:flex-row items-center  gap-2 justify-between p-4 text-black font-bold`}>
      {/* necesito la logica de buscar */}
      <SearchInput />
      <div className="flex sm:items-center justify-end gap-4 w-full">
        {user ? (
          <p>
            {user.nombre} {user.apellido}
          </p>
        ) : (
          <div onClick={handleSignIn}>
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
