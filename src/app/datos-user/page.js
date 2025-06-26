'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import withUserAuth from '../utils/withUserAuth'
import { useSignals } from '@preact/signals-react/runtime'
import { updateUser } from '@/lib/graphql'
import { errorMessage } from '../utils/toast/toastMessages'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
function UserProfilePage() {
  useSignals()
  const { user, setUser } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [formData, setFormData] = useState({
    dni: user?.dni || '',
    name: user?.nombre || '',
    lastName: user?.apellido || '',
    address: user?.domicilio || '',
    email: user?.correo_electronico || '',
    phone: user?.telefono || '',
  })

  useEffect(() => {
    setFormData({
      dni: user?.dni || '',
      name: user?.nombre || '',
      lastName: user?.apellido || '',
      address: user?.domicilio || '',
      email: user?.correo_electronico || '',
      phone: user?.telefono || '',
    })
  }, [user])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    setFormData({
      dni: user?.dni || '',
      name: user?.nombre || '',
      lastName: user?.apellido || '',
      address: user?.domicilio || '',
      email: user?.correo_electronico || '',
      phone: user?.telefono || '',
    })
    setIsEditing(false)
    setSaveError(null)
    setSuccessMessage(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveError(null)
    setSuccessMessage(null)

    try {
      const { name, lastName, phone, address } = formData
      const response = await updateUser({
        id_persona: user.id_persona,
        input: {
          dni: user.dni,
          name,
          lastName,
          phone,
          email: user.correo_electronico,
          address,
        },
      })

      if (response?.errors?.length > 0) {
        response.errors.forEach(error => errorMessage(error.message))
        return
      }

      setUser(prevUser => ({
        ...prevUser,
        nombre: name,
        apellido: lastName,
        domicilio: address,
        telefono: phone,
      }))

      setSuccessMessage('Tus cambios se han guardado correctamente')
      setIsEditing(false)
    } catch (error) {
      console.error('Error al guardar los cambios:', error)
      setSaveError(
        error.message ||
          'Error al guardar los cambios. Por favor intenta nuevamente.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Mi cuenta</h1>
          <p className="text-gray-600">Administra tu información personal</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Botón de volver con flechita */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center text-gray-700 hover:text-pink-500 transition-colors group">
          <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver a la Tienda</span>
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shadow">
                    <span className="text-pink-600 font-semibold text-base">
                      {user?.nombre?.charAt(0)}
                      {user?.apellido?.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Perfil
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {successMessage}
                  </div>
                )}
                {saveError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {saveError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData).map(([key, value], index) => (
                    <div key={index} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {key.replace('_', ' ')}
                      </label>

                      {isEditing ? (
                        <input
                          type="text"
                          name={key}
                          value={value}
                          onChange={handleChange}
                          disabled={key === 'dni' || key === 'email'}
                          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 ${
                            key === 'dni' || key === 'email'
                              ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                              : 'border border-pink-300 focus:ring-pink-500 focus:border-pink-500'
                          }`}
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
                          <p className="text-gray-900">{value || '-'}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="px-4 py-2 border border-pink-300 text-pink-700 rounded-md hover:bg-pink-50">
                      Editar
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50">
                        {isSaving ? 'Guardando...' : 'Guardar cambios'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withUserAuth(UserProfilePage)
