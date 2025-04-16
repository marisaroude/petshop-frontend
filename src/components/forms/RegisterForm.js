'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/zod/schemas/user'
import { createUser } from '@/lib/graphql'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'

export default function RegisterForm({ userInfo }) {
  const router = useRouter()

  const fullName = userInfo.name.split(' ')
  const name = fullName[0]
  const lastName = fullName.slice(1).join(' ')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name,
      lastName,
      email: userInfo?.email || '',
    },
  })

  const onSubmit = async data => {
    console.log('Datos enviados:', data)
    try {
      const response = await createUser(data)
      console.log('response', response)
      if (response.data.createPersona) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const InfoForm = [
    { label: 'DNI', value: 'dni' },
    { label: 'Nombre', value: 'name' },
    { label: 'Apellido', value: 'lastName' },
    { label: 'Domicilio', value: 'address' },
    { label: 'Correo Electrónico', value: 'email' },
    { label: 'Teléfono', value: 'phone' },
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col items-center gap-4 w-1/2 p-20">
      <h2 className="text-black">Ingrese sus datos</h2>
      <div className="flex flex-col gap-4 bg-pink rounded-md w-full p-4 ">
        {InfoForm.map(item => (
          <InputWithLabel
            key={item.value}
            item={item}
            register={register(item.value)}
            error={errors[item.value]?.message}
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-pink text-white px-6 py-2 rounded-md">
        Registrar
      </button>
    </form>
  )
}
