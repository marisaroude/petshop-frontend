'use client'

import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { onSubmitMercadoPago } from '@/lib/mercadopago/initMercadoPago'
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'

export default function ModalRedirectMP({
  productsCart,
  setLoading,
  loading,
  setOpen,
  open,
}) {
  const { bgColor } = useBackgroundColor()
  const handleContinueMercadoPago = async () => {
    if (loading) return
    setOpen(false)
    await onSubmitMercadoPago(setLoading, productsCart)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6">
          <DialogTitle className="text-xl font-bold">
            Redirigir a Mercado Pago
          </DialogTitle>
          <div className="mt-4">
            <p>
              ¿Está seguro de que ha completado su orden? Puede volver y
              continuar con su compra o dirigirse a Mercado Pago para abonar.
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 cursor-pointer rounded-md">
              Volver
            </button>
            <button
              onClick={handleContinueMercadoPago}
              className={`px-4 py-2 ${bgColor} cursor-pointer text-white rounded-md`}>
              Continuar a Mercado Pago
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
