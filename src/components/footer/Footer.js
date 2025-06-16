import React from 'react'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const { bgColor } = useBackgroundColor()
  return (
    <div
      className={`${bgColor} py-4 px-6 flex flex-col sm:flex-row text-black items-start justify-between w-full`}>
      <div className="self-center">
        <img src="/LOGO-puppis.png" alt="Logo" className="h-20" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Contacto</h1>
        <p>Atención Teléfonica: 0810-220-2345</p>
        <p>Atención Whatsapp: +54-911-6702-6320</p>
        <p className="font-bold">Lunes a Sábados de 9 a 21 hs</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Seguinos</h1>
        <div className="flex gap-2">
          <FaInstagram className="w-6 h-6 text-black" />
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer">
            <span>@puppisarg</span>
          </a>
        </div>
        <div className="flex gap-2">
          <FaFacebook className="w-6 h-6 text-black" />
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer">
            <span>PuppisArgentina</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col self-center items-center gap-2">
        <h1 className="font-bold text-center">FORMAS DE PAGO</h1>
        <img
          src="/LOGO-MercadoPago.png"
          alt="Logo de Mercado Pago"
          className="h-20 w-20"
        />
      </div>
    </div>
  )
}
