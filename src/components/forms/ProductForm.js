'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import { categories } from '@/app/utils/data/categories'
import Select from '../inputs/Select'
import { productSchema } from '@/lib/zod/schemas/product'
import { UploadImage } from '../inputs/UploadImage'
import { createProductoServicio } from '@/lib/graphql'
import { productSuccesfullyCreated } from '@/app/utils/toast/toastMessages'

export default function ProductForm({ productInfo }) {
  const router = useRouter()
  const [image, setImage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { active: false },
  })

  useEffect(() => {
    if (productInfo) {
      reset({
        name: productInfo.nombre,
        price: productInfo.precio,
        stock: productInfo.stock,
        category: productInfo.categoria,
        active: productInfo.activo,
        description: productInfo.descripcion,
      })
      setImage(productInfo.image || null)
    }
  }, [productInfo, reset])

  const onSubmit = async data => {
    console.log('Datos enviados:', data)
    data.image = image
    try {
      const response = await createProductoServicio(data)
      console.log('response', response)
      if (response.data.createProductoServicio) {
        productSuccesfullyCreated()
        reset()
        setImage(null)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // const handleImageUpload = e => {
  //   const file = e.target.files[0]
  //   setImage(URL.createObjectURL(file))
  //   console.log('image', image)
  // }

  const handleRemoveFile = () => {
    setImage(null)
  }

  const InfoForm = [
    { label: 'Nombre del producto', value: 'name' },
    { label: 'Precio', value: 'price' },
    { label: 'Stock', value: 'stock' },
    { label: 'Descripción', value: 'description', isTextArea: true },
  ]

  return (
    <div className="flex items-center justify-center bg-lightgreen p-8 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-64 bg-gray-200 rounded-md flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Product"
              className="object-contain w-full h-full rounded-md"
            />
          ) : (
            <span className="text-gray-500">Foto del Producto</span>
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
      <form onSubmit={handleSubmit(onSubmit)} className="ml-8 space-y-4">
        {InfoForm.map(item => (
          <InputWithLabel
            key={item.value}
            item={item}
            register={register(item.value)}
            error={errors[item.value]?.message}
            isTextArea={item.isTextArea}
          />
        ))}

        {/* Select de Categoría */}
        <Select
          label="Categoría"
          register={register('category')}
          error={errors.category?.message}
          options={categories}
        />

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

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            Volver
          </button>
          <button
            type="submit"
            className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md">
            {productInfo ? 'Modificar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  )
}
