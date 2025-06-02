'use client'
import React, { useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import PromocionInfo from '@/components/promociones/PromocionInfo'
import { allPromos } from '@/app/signals/promociones'
import withAdminAuth from '@/app/utils/withAdminAuth'

function isVigente(promo) {
  const hoy = new Date()
  const inicio = new Date(promo.fecha_inicio)
  const fin = new Date(promo.fecha_fin)
  return hoy >= inicio && hoy <= fin
}

function isActive(promo) {
  return promo.activo
}
function page() {
  useSignals()

  const [filtro, setFiltro] = useState('todas') // 'vigentes' | 'vencidas' | 'activas'| 'no activas'|'todas'

  const promosFiltered = allPromos?.value
    ?.filter(promo => {
      if (filtro === 'vigentes') return isVigente(promo)
      if (filtro === 'vencidas') return !isVigente(promo)
      if (filtro === 'activas') return isActive(promo)
      if (filtro === 'no-activas') return !isActive(promo)

      return true
    })
    ?.sort((a, b) => b.id_promocion - a.id_promocion)

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex justify-end">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="vigentes">Solo vigentes</option>
          <option value="vencidas">Solo vencidas</option>
          <option value="activas">Solo Activas</option>
          <option value="no-activas">Solo No Activas</option>
        </select>
      </div>

      {promosFiltered?.map((promo, index) => (
        <div className="w-full" key={index}>
          <PromocionInfo promo={promo} />
        </div>
      ))}
    </div>
  )
}

export default withAdminAuth(page)
