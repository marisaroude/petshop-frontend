'use client'
import React from 'react'
import { faqs } from '../utils/data/faqs'
import CustomDisclosure from '@/components/disclosure/CustomDisclosure'
import withUserAuth from '../utils/withUserAuth'

function page() {
  return (
    <div className="bg-white p-6 h-full gap-2 w-full flex flex-col items-center">
      <h1 className="text-3xl mb-6">Preguntas frecuentes</h1>

      {faqs.map((item, index) => {
        return (
          <div key={index} className="w-full">
            <CustomDisclosure data={item} />
          </div>
        )
      })}
    </div>
  )
}

export default withUserAuth(page)
