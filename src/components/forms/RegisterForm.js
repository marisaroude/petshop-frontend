import React from 'react'
import InputWithLabel from '../InputWithLabel'

export default function RegisterForm() {
  const InfoForm = [
    'DNI',
    'Nombre',
    'Apellido',
    'Domicilio',
    'Correo Electrónico',
    'Teléfono',
  ]
  return (
    <>
      <div className="flex flex-col items-center gap-4 p-20">
        <h2 className="text-black">Ingrese sus datos</h2>
        <div className="flex flex-col gap-4 bg-pink rounded-md w-full p-4 ">
          {InfoForm.map(item => {
            return <InputWithLabel label={item} />
          })}
        </div>
      </div>
    </>
  )
}
