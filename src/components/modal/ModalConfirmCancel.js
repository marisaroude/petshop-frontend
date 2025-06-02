import React from 'react'

export default function ModalConfirmCancel({ openModal, onClickConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 max-w-sm w-full">
        <h2 className="text-xl font-bold">¿Estás seguro?</h2>
        <p>¿Desea dar de baja a este usuario?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => openModal(false)}
            className="px-4 py-2 bg-gray-300 rounded-md">
            Cancelar
          </button>
          <button
            onClick={onClickConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
