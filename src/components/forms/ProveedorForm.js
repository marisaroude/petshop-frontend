'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { createProveedor, updateProveedor } from '@/lib/graphql'
import {
  errorMessage,
  proveedorSuccesfullyCreatedOrUpdate,
} from '@/app/utils/toast/toastMessages'
import { proveedorSchema } from '@/lib/zod/schemas/proveedor'
import { allProveedores } from '@/app/signals/proveedores'

export default function ProveedorForm({ proveedor }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(proveedorSchema),
    defaultValues: { active: false },
  })

  const onSubmit = async data => {
    console.log('Datos enviados:', data)

    try {
      const response = proveedor
        ? await updateProveedor({
            id_proveedor: proveedor.id_proveedor,
            input: data,
          })
        : await createProveedor(data)

      console.log('Response:', response)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }

      const newProveedor = proveedor
        ? response.data.updateProveedor
        : response.data.createProveedor

      allProveedores.value = proveedor
        ? allProveedores.value?.map(p =>
            p.id_proveedor === newProveedor.id_proveedor ? newProveedor : p,
          )
        : [...allProveedores.value, newProveedor]

      proveedorSuccesfullyCreatedOrUpdate(!!proveedor)
      reset()
      router.push('/admin/proveedores')
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al guardar el proveedor.')
    }
  }

  const InfoForm = [
    { label: 'Nombre proveedor', value: 'name' },
    { label: 'Cuit Proveedor', value: 'cuit' },
  ]

  useEffect(() => {
    if (proveedor) {
      reset({
        cuit: proveedor.cuit,
        name: proveedor.nombre,
        active: proveedor.activo,
      })
    }
  }, [proveedor, reset])

  return (
    <div className="flex items-center justify-center bg-lightgreen p-8 rounded-lg shadow-lg">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        onSubmit={handleSubmit(onSubmit)}>
        {InfoForm.map(item => (
          <InputWithLabel
            type={item.type}
            key={item.value}
            item={item}
            register={register(item.value)}
            error={errors[item.value]?.message}
          />
        ))}

        {/* Checkbox Activo */}
        <div className="flex items-center gap-2">
          <label className="text-black">Proveedor activo</label>
          <input
            defaultChecked={true}
            type="checkbox"
            {...register('active')}
            className="w-5 h-5"
          />
        </div>

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
            {proveedor ? 'Modificar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  )
}
