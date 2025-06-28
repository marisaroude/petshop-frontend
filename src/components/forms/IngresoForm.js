'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import InputWithLabel from '../inputs/InputWithLabel'
import Select from '../inputs/Select'
import { createIngresoProducto } from '@/lib/graphql'
import {
  errorMessage,
  ingresoSuccessfullyCreated,
} from '@/app/utils/toast/toastMessages'
import { allProducts } from '@/app/signals/products'
import { allProveedores } from '@/app/signals/proveedores'
import { ingresoSchema } from '@/lib/zod/schemas/ingresos'
import ModalConfirmIngreso from '../modal/ModalConfirmIngreso'

export default function IngresoForm() {
  const [products, setProducts] = useState()
  const [proveedores, setProveedores] = useState()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [formData, setFormData] = useState(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ingresoSchema),
  })

  const onSubmit = data => {
    const producto = allProducts.value.find(prod => prod.id_ps === data.id_ps)
    const proveedor = allProveedores.value.find(
      prov => prov.id_proveedor === data.id_proveedor,
    )

    const newData = {
      ...data,
      nameProducto: producto.nombre,
      nameProveedor: proveedor.nombre,
    }
    setFormData(newData)
    setShowConfirmModal(true)
  }

  const handleConfirmIngreso = async () => {
    try {
      const { nameProducto, nameProveedor, ...rest } = formData
      const today = new Date()
      rest.dateEntry = today
      const response = await createIngresoProducto(rest)

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }

      const { updatedProduct } = response.data.createIngresoProducto
      allProducts.value = allProducts.value.map(p =>
        p.id_ps === updatedProduct.id_ps ? updatedProduct : p,
      )

      ingresoSuccessfullyCreated()
      reset()
      router.push('/admin/productos')
    } catch (error) {
      console.error('Error:', error)
      errorMessage('Ocurrió un error al guardar el ingreso.')
    } finally {
      setShowConfirmModal(false)
      setFormData(null)
    }
  }

  const InfoForm = [
    { label: 'Cantidad', value: 'quantity', type: 'number' },
    { label: 'Subtotal', value: 'subtotal', type: 'number' },
  ]

  useEffect(() => {
    setProducts(
      allProducts?.value?.map(product => ({
        label: product.nombre,
        value: product.id_ps,
      })),
    )

    setProveedores(
      allProveedores?.value?.map(proveedor => ({
        label: proveedor.nombre,
        value: proveedor.id_proveedor,
      })),
    )
  }, [allProducts.value, allProveedores.value])

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

        {/* Select de Producto */}
        {proveedores && (
          <Select
            label="Proveedor"
            register={register('id_proveedor')}
            error={errors.id_proveedor?.message}
            options={proveedores}
          />
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
            Agregar
          </button>
        </div>
      </form>

      {/* Modal */}
      {showConfirmModal && formData && (
        <ModalConfirmIngreso
          openModal={setShowConfirmModal}
          onClickConfirm={handleConfirmIngreso}
          data={formData}
        />
      )}
    </div>
  )
}
