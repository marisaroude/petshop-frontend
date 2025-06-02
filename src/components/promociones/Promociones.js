import { allPromos } from '@/app/signals/promociones'
import React from 'react'
import PromoCarousel from '../carousel/PromoCarousel'

export default function Promociones() {
  const currentDate = new Date()
  const OPTIONS = {
    align: 'center',
    loop: true, // opcional, pero suele ir bien con carruseles
  }
  const activePromos = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
      allPromos.value?.filter(promo => {
        if (!promo.activo) return false

        const fechaFin = new Date(promo.fecha_fin)
        fechaFin.setHours(0, 0, 0, 0)

        return fechaFin >= today
      }) || []
    )
  }

  return (
    <div className="flex justify-content m-6 p-6">
      <PromoCarousel slides={activePromos()} options={OPTIONS} />
    </div>
  )
}
