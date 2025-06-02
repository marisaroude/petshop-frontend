'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { updateUser, cancelPersona } from '@/lib/graphql'
import {
  userUpdatedSuccesfully,
  errorMessage,
  userCanceledSuccessfully,
} from '@/app/utils/toast/toastMessages'
import { userSchemaWithFechaBaja } from '@/lib/zod/schemas/user'
import { allUsers } from '@/app/signals/user'
import ModalConfirmCancel from '../modal/ModalConfirmCancel'

export default function UserForm({ user }) {
  const router = useRouter()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchemaWithFechaBaja),
    defaultValues: { active: false },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.nombre,
        lastName: user.apellido,
        address: user.domicilio,
        email: user.correo_electronico,
        phone: user.telefono,
        dni: user.dni,
        discharge_date: user.fecha_baja,
      })
    }
  }, [user, reset])

  const onSubmit = async data => {
    try {
      const response = await updateUser({
        id_persona: user.id_persona,
        input: data,
      })

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error))
        return
      }

      const userUpdated = response.data.updatePersona
      allUsers.value = allUsers.value.map(u =>
        u.id_persona === userUpdated.id_persona ? userUpdated : u,
      )

      userUpdatedSuccesfully()
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al actualizar el usuario.')
    }
  }

  const onConfirmBaja = async () => {
    try {
      await cancelPersona({ id_persona: user.id_persona })
      //   allUsers.value = allUsers.value?.map(u =>
      //     u.id_persona === response.data.cancelPersona.id_persona
      //       ? response.data.cancelPersona
      //       : u,
      //   )
      userCanceledSuccessfully()
      setShowConfirmModal(false)
      router.push('/')
    } catch (error) {
      console.error(error)
      errorMessage('Error al dar de baja al usuario')
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
    <div className="w-[40%] flex flex-col items-center justify-center bg-lightgreen p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {InfoForm.map(item => (
          <InputWithLabel
            type={item.type}
            key={item.value}
            item={item}
            register={register(item.value)}
            error={errors[item.value]?.message}
          />
        ))}

        {user?.fecha_baja ? (
          <InputWithLabel
            type="date"
            item={{ label: 'Fecha de baja', value: 'discharge_date' }}
            register={register('discharge_date')}
            error={errors['discharge_date']?.message}
          />
        ) : (
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              id="darDeBaja"
              onClick={() => setShowConfirmModal(true)}
              className="mt-4 cursor-pointer bg-red-300 text-black px-6 py-2 rounded-md">
              Dar de baja a este usuario
            </button>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Volver
          </button>
          <button
            type="submit"
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Modificar
          </button>
        </div>
      </form>

      {/* Modal */}
      {showConfirmModal && (
        <ModalConfirmCancel
          openModal={setShowConfirmModal}
          onClickConfirm={onConfirmBaja}
        />
      )}
    </div>
  )
}
