'use client'
import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withAdminAuth from '@/app/utils/withAdminAuth'
import { allUsers } from '@/app/signals/user'
import { getAllPerson } from '@/lib/graphql'
import UserInfo from '@/components/users/UserInfo'

function page() {
  useSignals()

  const [filtro, setFiltro] = useState('todos')
  const isActivo = user => user.fecha_baja === null
  const isAdmin = user => user.tipo === true
  const isCliente = user => user.tipo === false

  const usersFiltered = allUsers?.value
    ?.filter(user => {
      if (filtro === 'activos') return isActivo(user)
      if (filtro === 'baja') return !isActivo(user)
      if (filtro === 'clientes') return isCliente(user)
      if (filtro === 'admins') return isAdmin(user)
      return true // 'todos'
    })
    ?.sort((a, b) => b.id_persona - a.id_persona)

  useEffect(() => {
    if (!allUsers.value) {
      const fetchPersonas = async () => {
        const response = await getAllPerson()
        allUsers.value = response
      }
      fetchPersonas()
    }
  }, [])
  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex justify-end">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activos">Solo activos</option>
          <option value="baja">Solo dados de baja</option>
          <option value="clientes">Solo clientes</option>
          <option value="admins">Solo admins</option>
        </select>
      </div>
      <h1 className="text-3xl">Listado de Clientes</h1>
      {usersFiltered?.map((user, index) => (
        <div className="w-full" key={index}>
          <UserInfo user={user} />
        </div>
      ))}
    </div>
  )
}

export default withAdminAuth(page)
