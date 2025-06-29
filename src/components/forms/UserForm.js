'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { updateUser, cancelPersona, registerPersona } from '@/lib/graphql'
import {
  userUpdatedSuccesfully,
  errorMessage,
  userCanceledSuccessfully,
  userRegisteredSuccessfully,
} from '@/app/utils/toast/toastMessages'
import { userSchemaWithFechaBaja } from '@/lib/zod/schemas/user'
import { allUsers } from '@/app/signals/user'
import ModalConfirm from '../modal/ModalConfirm'

export default function UserForm({ user }) {
  const router = useRouter()
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false)
  const [showConfirmAltaModal, setShowConfirmAltaModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchemaWithFechaBaja),
    // defaultValues: { active: false },
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
      router.back()
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al actualizar el usuario.')
    }
  }

  const onConfirmBaja = async () => {
    try {
      const response = await cancelPersona({ id_persona: user.id_persona })

      setShowConfirmCancelModal(false)
      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }
      const personaCanceled = response.data.cancelPersona
      allUsers.value = allUsers.value?.map(u =>
        u.id_persona === personaCanceled.id_persona ? personaCanceled : u,
      )

      userCanceledSuccessfully()
      router.back()
    } catch (error) {
      console.error(error)
      errorMessage('Error al dar de baja al usuario')
    }
  }

  const onConfirmAlta = async () => {
    try {
      const response = await registerPersona({ id_persona: user.id_persona })

      setShowConfirmAltaModal(false)
      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }
      const personaRegistered = response.data.registerPersona
      allUsers.value = allUsers.value?.map(u =>
        u.id_persona === personaRegistered.id_persona ? personaRegistered : u,
      )

      userRegisteredSuccessfully()
      router.back()
    } catch (error) {
      console.error(error)
      errorMessage('Error al dar de alta al usuario')
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
              onClick={() => setShowConfirmCancelModal(true)}
              className="mt-4 cursor-pointer bg-red-300 text-black px-6 py-2 rounded-md">
              Dar de baja a este usuario
            </button>
          </div>
        )}

        {user?.fecha_baja && (
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              id="darDeAlta"
              onClick={() => setShowConfirmAltaModal(true)}
              className="mt-4 cursor-pointer bg-[#20A920] text-black px-6 py-2 rounded-md">
              Dar de alta a este usuario
            </button>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
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
      {showConfirmCancelModal && (
        <ModalConfirm
          openModal={setShowConfirmCancelModal}
          onClickConfirm={onConfirmBaja}
          textAlert={'¿Estás seguro?'}
          bodyText={'¿Desea dar de baja a este usuario?'}
        />
      )}

      {showConfirmAltaModal && (
        <ModalConfirm
          openModal={setShowConfirmAltaModal}
          onClickConfirm={onConfirmAlta}
          textAlert={'¿Estás seguro?'}
          bodyText={'¿Desea dar de alta a este usuario?'}
        />
      )}
    </div>
  )
}
