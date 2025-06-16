'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { serviceSchema } from '@/lib/zod/schemas/product'
import { createProductoServicio, updateProductoServicio } from '@/lib/graphql'
import {
  errorMessage,
  serviceSuccesfullyCreatedOrUpdate,
} from '@/app/utils/toast/toastMessages'
import { allProducts } from '@/app/signals/products'
import DatesFieldServices from '../servicios/DatesFieldServices'

export default function ServicioForm({ servicioInfo }) {
  const router = useRouter()
  const [dates, setDates] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: { active: false, category: 'servicios' },
  })

  useEffect(() => {
    if (servicioInfo) {
      reset({
        name: servicioInfo.nombre,
        price: servicioInfo.precio.toString(),
        category: servicioInfo.categoria,
        active: servicioInfo.activo,
        description: servicioInfo.descripcion,
        services_dates: servicioInfo.fechas_servicios,
      })

      setDates(servicioInfo.fechas_servicios)
    }
  }, [servicioInfo, reset])

  const onSubmit = async data => {
    console.log('Datos enviados:', data)
    data.services_dates = dates
    if (servicioInfo) data.stock = servicioInfo.stock
    try {
      const response = servicioInfo
        ? await updateProductoServicio({
            id_ps: servicioInfo.id_ps,
            input: data,
          })
        : await createProductoServicio(data)

      console.log('Response:', response)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error))
        return
      }

      const newProduct = servicioInfo
        ? response.data.updateProductoServicio
        : response.data.createProductoServicio

      allProducts.value = servicioInfo
        ? allProducts.value.map(p =>
            p.id_ps === newProduct.id_ps ? newProduct : p,
          )
        : [...allProducts.value, newProduct]

      serviceSuccesfullyCreatedOrUpdate(!!servicioInfo)
      reset()
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al guardar el producto.')
    }
  }

  const InfoForm = [
    { label: 'Nombre del servicio', value: 'name' },
    { label: 'Precio', value: 'price' },
    {
      label: 'Descripción del servicio',
      value: 'description',
      isTextArea: true,
    },
  ]

  return (
    <div className="flex items-center w-full max-w-2xl justify-center bg-lightgreen p-8 rounded-lg shadow-lg">
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

        {/* Checkbox Activo */}
        <div className="flex items-center gap-2">
          <label className="text-black">Activo</label>
          <input
            defaultChecked={true}
            type="checkbox"
            {...register('active')}
            className="w-5 h-5"
          />
        </div>

        <DatesFieldServices
          label="Fechas en que se puede brindar el servicio"
          dates={dates}
          setDates={setDates}
        />
        {dates?.length === 0 && (
          <span className="text-red-600 text-sm">
            Debe cargar al menos una fecha.
          </span>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Volver
          </button>
          <button
            disabled={dates.length === 0}
            type="submit"
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            {servicioInfo ? 'Modificar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  )
}
