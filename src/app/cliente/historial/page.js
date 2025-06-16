'use client'

import React, { useEffect, useState } from 'react'
import { useSignals } from '@preact/signals-react/runtime'
import withUserAuth from '@/app/utils/withUserAuth'
import { pagosByPersona } from '@/lib/graphql'
import { useAuth } from '@/app/context/authContext'
import PurchasedItem from '@/components/historial/PurchasedItem'

function Page() {
  useSignals()
  const { user } = useAuth()
  const [purchases, setPurchases] = useState([])
  const [visibleCount, setVisibleCount] = useState(5)
  const visiblePurchases = purchases?.slice(0, visibleCount)

  useEffect(() => {
    const fetchPagos = async () => {
      const response = await pagosByPersona({
        id_persona: user.id_persona,
      })

      const sorted = [...response].sort((a, b) => {
        const fechaA = new Date(a.pago.id_pago)
        const fechaB = new Date(b.pago.id_pago)
        return fechaB - fechaA // más nueva a más vieja
      })

      setPurchases(sorted)
    }

    if (user?.id_persona) {
      fetchPagos()
    }
  }, [user?.id_persona])

  return (
    <div className="bg-white min-h-screen p-6 w-full flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Historial de Compra</h1>
      {purchases.length === 0 ? (
        <p className="text-gray-500">No hay compras registradas.</p>
      ) : (
        visiblePurchases?.map((purchase, index) => (
          <div className="w-full max-w-4xl" key={index}>
            <PurchasedItem purchase={purchase} />
          </div>
        ))
      )}

      {visibleCount < purchases?.length && (
        <button
          onClick={() => setVisibleCount(prev => prev + 10)}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
          Ver más
        </button>
      )}
    </div>
  )
}

export default withUserAuth(Page)
