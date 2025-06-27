'use client'

import React from 'react'
import { useSignals } from '@preact/signals-react/runtime'

import withAdminAuth from '@/app/utils/withAdminAuth'
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
} from '@heroicons/react/16/solid'
import IconInfo from '@/components/IconInfo'

function page() {
  const informes = [
    { title: 'Clientes', icon: <UsersIcon />, route: 'clientes' },
    {
      title: 'Productos',
      icon: <ShoppingBagIcon />,
      route: 'productos-informes',
    },
    { title: 'Ventas', icon: <PresentationChartBarIcon />, route: 'ventas' },
  ]

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl p-6">Informes</h1>

      <div className="flex sm:flex-row flex-col gap-2 bg-white p-8 w-full items-center  justify-evenly">
        {informes?.map((info, index) => (
          <IconInfo key={index} info={info} />
        ))}
      </div>
    </div>
  )
}

export default withAdminAuth(page)
