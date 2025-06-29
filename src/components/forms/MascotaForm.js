'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { UploadImage } from '../inputs/UploadImage'
import {
  cancelMascota,
  createMascota,
  registerMascota,
  updateMascota,
} from '@/lib/graphql'
import {
  mascotaSchema,
  mascotaSchemaWithFechaBaja,
} from '@/lib/zod/schemas/mascota'
import { useAuth } from '@/app/context/authContext'
import {
  errorMessage,
  mascotaCanceledSuccessfully,
  mascotaRegisteredSuccessfully,
  mascotaSuccesfullyCreatedOrUpdate,
} from '@/app/utils/toast/toastMessages'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { allMascotas } from '@/app/signals/mascota'
import ModalConfirm from '../modal/ModalConfirm'

export default function MascotaForm({ mascotaInfo }) {
  const router = useRouter()
  const { user } = useAuth()
  const { bgColor } = useBackgroundColor()
  const [image, setImage] = useState(null)
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false)
  const [showConfirmAltaModal, setShowConfirmAltaModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      mascotaInfo ? mascotaSchemaWithFechaBaja : mascotaSchema,
    ),
  })

  useEffect(() => {
    if (mascotaInfo) {
      reset({
        name: mascotaInfo.nombre,
        type: mascotaInfo.tipo,
        race: mascotaInfo.raza,
        description: mascotaInfo.descripcion,
        discharge_date: mascotaInfo.fecha_baja,
      })
      setImage(mascotaInfo.image || null)
    }
  }, [mascotaInfo, reset])

  const onSubmit = async data => {
    data.image = image
    if (!mascotaInfo) {
      data.id_persona = user.id_persona
    }

    console.log('Datos enviados:', data)
    try {
      const response = mascotaInfo
        ? await updateMascota({
            id_mascota: mascotaInfo.id_mascota,
            input: data,
          })
        : await createMascota(data)

      console.log('Response:', response)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error))
        return
      }

      if (mascotaInfo && user?.tipo) {
        const mascotaUpdated = response.data.updateMascota
        allMascotas.value = allMascotas.value.map(u =>
          u.id_mascota === mascotaUpdated.id_mascota ? mascotaUpdated : u,
        )
      }

      mascotaSuccesfullyCreatedOrUpdate(!!mascotaInfo)
      reset()
      setImage(null)
      router.back()
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al guardar la mascota.')
    }
  }

  const onConfirmBaja = async () => {
    try {
      const response = await cancelMascota({
        id_mascota: mascotaInfo.id_mascota,
      })

      setShowConfirmCancelModal(false)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }
      const mascotaCanceled = response.data.cancelMascota

      if (user?.tipo) {
        allMascotas.value = allMascotas.value.map(u =>
          u.id_mascota === mascotaCanceled.id_mascota ? mascotaCanceled : u,
        )
      }

      mascotaCanceledSuccessfully()
      router.back()
    } catch (error) {
      console.error(error)
      errorMessage('Error al dar de baja la mascota')
    }
  }

  const onConfirmAlta = async () => {
    try {
      const response = await registerMascota({
        id_mascota: mascotaInfo.id_mascota,
      })

      setShowConfirmAltaModal(false)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }
      const mascotaRegistered = response.data.registerMascota

      if (user?.tipo) {
        allMascotas.value = allMascotas.value.map(u =>
          u.id_mascota === mascotaRegistered.id_mascota ? mascotaRegistered : u,
        )
      }

      mascotaRegisteredSuccessfully()
      router.back()
    } catch (error) {
      console.error(error)
      errorMessage('Error al dar de baja la mascota')
    }
  }

  const handleRemoveFile = () => {
    setImage(null)
  }

  const InfoForm = [
    { label: 'Nombre de la mascota', value: 'name' },
    { label: 'Tipo de mascota', value: 'type' },
    { label: 'Raza de la mascota', value: 'race' },
    { label: 'Descripción', value: 'description', isTextArea: true },
  ]

  return (
    <div
      className={`sm:w-auto w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 ${bgColor} sm:p-8 p-4 rounded-lg shadow-lg`}>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-64 h-64 bg-gray-200 rounded-md flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Product"
              className="object-contain w-full h-full rounded-md"
            />
          ) : (
            <span className="text-gray-500">Sin foto</span>
          )}
        </div>
        <div className="flex mt-2 gap-2 items-center">
          <UploadImage onUploadSuccess={url => setImage(url)} image={image} />
          {image && (
            <div
              onClick={handleRemoveFile}
              className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer">
              Remover Foto
            </div>
          )}
        </div>
      </div>

      {/* Formulario de información */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        {InfoForm.map(item => (
          <InputWithLabel
            key={item.value}
            item={item}
            register={register(item.value)}
            error={errors[item.value]?.message}
            isTextArea={item.isTextArea}
          />
        ))}
        {mascotaInfo &&
          (mascotaInfo?.fecha_baja ? (
            <InputWithLabel
              type="date"
              disabled={!user?.tipo}
              item={{ label: 'Fecha de baja', value: 'discharge_date' }}
              register={register('discharge_date')}
              error={errors['discharge_date']?.message}
            />
          ) : (
            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                id="darDeBajaMascota"
                onClick={() => setShowConfirmCancelModal(true)}
                className="mt-4 cursor-pointer bg-red-300 text-black px-6 py-2 rounded-md">
                Dar de baja a esta mascota
              </button>
            </div>
          ))}

        {mascotaInfo?.fecha_baja && user?.tipo && (
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              id="darDeAltaMascota"
              onClick={() => setShowConfirmAltaModal(true)}
              className="mt-4 cursor-pointer bg-[#20A920] text-black px-6 py-2 rounded-md">
              Dar de alta a esta mascota
            </button>
          </div>
        )}

        <div className="flex gap-4 justify-center sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Volver
          </button>
          <button
            type="submit"
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            {mascotaInfo ? 'Modificar' : 'Agregar'}
          </button>
        </div>
      </form>

      {/* Modal */}
      {showConfirmCancelModal && (
        <ModalConfirm
          openModal={setShowConfirmCancelModal}
          onClickConfirm={onConfirmBaja}
          textAlert={'¿Estás seguro?'}
          bodyText={'¿Desea dar de baja a esta mascota?'}
        />
      )}

      {showConfirmAltaModal && (
        <ModalConfirm
          openModal={setShowConfirmAltaModal}
          onClickConfirm={onConfirmAlta}
          textAlert={'¿Estás seguro?'}
          bodyText={'¿Desea dar de alta a esta mascota?'}
        />
      )}
    </div>
  )
}
