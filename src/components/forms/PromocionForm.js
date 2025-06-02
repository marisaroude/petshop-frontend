'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import Select from '../inputs/Select'

import { createPromo, updatePromocion } from '@/lib/graphql'
import {
  errorMessage,
  promoSuccesfullyCreatedOrUpdate,
} from '@/app/utils/toast/toastMessages'
import { allProducts } from '@/app/signals/products'
import { promocionSchema } from '@/lib/zod/schemas/promocion'
import { allPromos } from '@/app/signals/promociones'

export default function PromocionForm({ promo }) {
  const [products, setProducts] = useState()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(promocionSchema),
    defaultValues: { active: false },
  })

  const onSubmit = async data => {
    console.log('Datos enviados:', data)

    try {
      4
      const response = promo
        ? await updatePromocion({
            id_promocion: promo.id_promocion,
            input: data,
          })
        : await createPromo(data)

      console.log('Response:', response)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }

      const newPromo = promo
        ? response.data.updatePromocion
        : response.data.createPromocion

      allPromos.value = promo
        ? allPromos.value.map(p =>
            p.id_promocion === newPromo.id_promocion ? newPromo : p,
          )
        : [...allPromos.value, newPromo]

      promoSuccesfullyCreatedOrUpdate(!!promo)
      reset()
      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al guardar la promocion.')
    }
  }

  const InfoForm = [
    { label: 'Inicio de la promo', value: 'start_date', type: 'date' },
    { label: 'Fin de la promo', value: 'end_date', type: 'date' },
    { label: 'Valor Descuento (en pesos)', value: 'cost', type: 'number' },
  ]

  useEffect(() => {
    if (promo) {
      reset({
        start_date: promo.fecha_inicio,
        end_date: promo.fecha_fin,
        cost: promo.valor.toString(),
        id_ps: promo.id_ps.toString(),
        active: promo.activo,
      })
    }
  }, [promo, reset])

  useEffect(() => {
    setProducts(
      allProducts?.value?.map(product => ({
        label: product.nombre,
        value: product.id_ps,
      })),
    )
  }, [allProducts.value])

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

        {/* Select de Producto */}
        {products && (
          <Select
            label="Producto"
            register={register('id_ps')}
            error={errors.id_ps?.message}
            options={products}
          />
        )}

        {/* Checkbox Activo */}
        <div className="flex items-center gap-2">
          <label className="text-black">Promo activa</label>
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
            onClick={() => router.push('/')}
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Volver
          </button>
          <button
            type="submit"
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            {promo ? 'Modificar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  )
}
