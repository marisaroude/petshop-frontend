import React from 'react'
import PromoCarousel from '../carousel/PromoCarousel'

export default function Promociones({ promos }) {
  const OPTIONS = {
    align: 'center',
    loop: true, // opcional, pero suele ir bien con carruseles
  }

  return (
    <div className="flex justify-content m-6 p-6">
      <PromoCarousel slides={promos} options={OPTIONS} />
    </div>
  )
}
