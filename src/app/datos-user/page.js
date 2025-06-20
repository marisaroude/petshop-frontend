'use client'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import withUserAuth from '../utils/withUserAuth'
import { useSignals } from '@preact/signals-react/runtime'

function UserProfilePage() {
  useSignals()

  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    dni: user?.dni || '',
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    domicilio: user?.domicilio || '',
    correo_electronico: user?.correo_electronico || '',
    telefono: user?.telefono || '',
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    setFormData({
      dni: user?.dni || '',
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      domicilio: user?.domicilio || '',
      correo_electronico: user?.correo_electronico || '',
      telefono: user?.telefono || '',
    })
    setIsEditing(false)
  }

  const handleSave = () => {
    setIsEditing(false)
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
                          // No se puede editar dni ni correo
                          disabled={
                            key === 'dni' || key === 'correo_electronico'
                          }
                          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2 ${
                            key === 'dni' || key === 'correo_electronico'
                              ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                              : 'border border-pink-300 focus:ring-pink-500 focus:border-pink-500'
                          }`}
                        />
                      ) : (
                        <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
                          <p className="text-gray-900">{value}</p>
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
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600">
                        Guardar cambios
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
