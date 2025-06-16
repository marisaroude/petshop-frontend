'use client'
import { useAuth } from '@/app/context/authContext'
import { allPromos } from '@/app/signals/promociones'
import {
  errorMessage,
  productSuccesfullyAdded,
} from '@/app/utils/toast/toastMessages'
import Divider from '@/components/Divider'
import ButtonAddToCart from '@/components/inputs/ButtonAddToCart'
import SelectorQuantity from '@/components/inputs/SelectorQuantity'
import { addToCart, getProductById } from '@/lib/graphql'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  createPregunta,
  createRespuesta,
  getPreguntasByProductId,
  getPersonById,
  getRespuestasByPreguntaId,
} from '@/lib/graphql'

function isVigente(promo) {
  const hoy = new Date()
  const inicio = new Date(promo.fecha_inicio)
  const fin = new Date(promo.fecha_fin)
  return hoy >= inicio && hoy <= fin
}
export default function page() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)

  const [product, setProduct] = useState()
  const { slug } = useParams()
  const { user } = useAuth()

  //para las preguntas y rtas
  const [preguntas, setPreguntas] = useState([])
  const [nuevaPregunta, setNuevaPregunta] = useState('')
  const [userName, setNombresUsuarios] = useState({})

  const [respuestas, setRespuestas] = useState({})
  const [nuevaRespuesta, setNuevaRespuesta] = useState({})

  // Verificar si es admin
  const isAdmin = user?.tipo === true

  // Obtener nombre de usuari
  const getUsername = async id_persona => {
    if (!id_persona);

    try {
      const persona = await getPersonById({ id_persona })

      if (!persona || typeof persona !== 'object') {
        console.error('Respuesta inválida de getPersonById:', persona)
        return `Usuario ${id_persona}`
      }

      const nombre = persona.nombre || ''
      const apellido = persona.apellido || ''

      return `${nombre} ${apellido}`.trim() || `Usuario ${id_persona}`
    } catch (error) {
      console.error(`Error al obtener usuario ${id_persona}:`, error)
      return `Usuario ${id_persona}`
    }
  }
  // Cargar nombres de usuarios
  useEffect(() => {
    const loadUsername = async () => {
      const uniqueUser = [
        ...new Set(preguntas.filter(p => p?.id_persona).map(p => p.id_persona)),
      ]

      const newName = {}

      await Promise.all(
        uniqueUser.map(async userId => {
          if (!userName[userId]) {
            newName[userId] = await getUsername(userId)
          }
        }),
      )

      if (Object.keys(newName).length > 0) {
        setNombresUsuarios(prev => ({ ...prev, ...newName }))
      }
    }

    loadUsername()
  }, [preguntas])

  // Obtener respuestas para una pregunta
  const fetchRespuestas = async preguntaId => {
    try {
      const res = await getRespuestasByPreguntaId({ id_preguntas: preguntaId })
      setRespuestas(prev => ({
        ...prev,
        [preguntaId]: res,
      }))
    } catch (error) {
      console.error('Error cargando respuestas:', error)
    }
  }

  // Enviar nueva respuesta (solo admin)
  const handleResponder = async preguntaId => {
    if (!nuevaRespuesta[preguntaId]?.trim()) {
      errorMessage('La respuesta no puede estar vacía')
      return
    }

    try {
      const result = await createRespuesta({
        descripcion: nuevaRespuesta[preguntaId].trim(),
        id_preguntas: preguntaId,
      })

      if (result?.data?.createRespuesta) {
        // Actualizar estado local
        setRespuestas(prev => ({
          ...prev,
          [preguntaId]: [
            ...(prev[preguntaId] || []),
            result.data.createRespuesta,
          ],
        }))
        // Limpiar campo
        setNuevaRespuesta(prev => ({ ...prev, [preguntaId]: '' }))
      }
    } catch (error) {
      console.error('Error al crear respuesta:', error.message)
      errorMessage(error.message || 'Error al enviar la respuesta')
    }
  }

  // Cargar preguntas y respuestas
  useEffect(() => {
    const fetchPreguntasYRespuestas = async () => {
      try {
        const preguntasData = await getPreguntasByProductId({
          id_ps: parseInt(slug),
        })

        if (Array.isArray(preguntasData)) {
          setPreguntas(preguntasData.filter(p => p !== null))
          // Cargar respuestas para cada pregunta
          preguntasData.forEach(p => p && fetchRespuestas(p.id_preguntas))
        }
      } catch (error) {
        console.error('Error fetching preguntas:', error)
      }
    }

    fetchPreguntasYRespuestas()
  }, [slug])

  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById({ id_ps: parseInt(slug) })
      setProduct(response)
    }
    fetchProductById()
  }, [])

  // Enviar nueva pregunta
  const handleEnviarPregunta = async () => {
    if (!nuevaPregunta.trim()) {
      errorMessage('La pregunta no puede estar vacía')
      return
    }

    if (!user?.id_persona) {
      errorMessage('Debes iniciar sesión para preguntar')
      return
    }

    try {
      const result = await createPregunta({
        description: nuevaPregunta.trim(),
        personId: user.id_persona,
        productId: parseInt(slug),
      })

      // Si la creación fue exitosa
      if (result?.data?.createPregunta) {
        // Agrega la nueva pregunta al inicio del listado
        setPreguntas(prev => [result.data.createPregunta, ...prev])
        setNuevaPregunta('')
        console.log('Pregunta enviada correctamente')
      }
    } catch (error) {
      console.error('Error al crear pregunta:', error.message)
      errorMessage(error.message || 'Error al enviar la pregunta')
    }
  }

  // useEffect(() => {
  //   const fetchProductById = async () => {
  //     const response = await getProductById({ id_ps: parseInt(slug) })
  //     setProduct(response)
  //   }
  //   fetchProductById()
  // }, [])

  const handleAddToCart = async () => {
    if (!user) return errorMessage('Debe ser usuario registrado para comprar.')
    const productPrice = product.precio
    const subtotal = productPrice * quantity
    const newProduct = {
      quantity: quantity,
      id_cart: parseInt(user.id_persona),
      subtotal: subtotal,
      id_ps: parseInt(slug),
    }

    const response = await addToCart(newProduct)

    if (response?.errors?.length > 0) {
      response.errors.forEach(error => errorMessage(error.message))
    } else {
      productSuccesfullyAdded(router)
    }
  }

  // Lógica de promoción
  const promoActiva = allPromos.value?.find(
    promo => promo.id_ps === parseInt(slug) && isVigente(promo),
  )

  const precioOriginal = product?.precio
  const valorDescuento = promoActiva?.valor || 0
  const precioConDescuento = precioOriginal - valorDescuento
  const porcentajeDescuento = Math.round(
    (valorDescuento / precioOriginal) * 100,
  )

  const renderPrice = () => {
    return promoActiva ? (
      <div className="flex flex-col gap-1">
        <p className="text-sm text-green-700 font-semibold">
          ¡Este producto está en promoción!
        </p>
        <p className="line-through text-gray-500">${precioOriginal}</p>
        <p className="text-black text-xl font-bold">${precioConDescuento}</p>
        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded w-fit">
          {porcentajeDescuento}% OFF
        </span>
      </div>
    ) : (
      <p className="text-black text-xl font-bold">Precio: ${precioOriginal}</p>
    )
  }
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-4">
        {product ? (
          <div className="flex flex-col gap-8">
            {/* Sección del producto */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Imagen del producto */}
                <div className="md:w-1/2">
                  <img
                    src={product.image || '/productImage.png'}
                    alt={product.nombre}
                    className="w-full h-64 object-contain rounded"
                  />
                </div>

                {/* Información del producto */}
                <div className="md:w-1/2 flex flex-col gap-4">
                  <h1 className="text-2xl font-bold">{product.nombre}</h1>
                  <p className="text-gray-700">{product.descripcion}</p>

                  <div className="mt-4">{renderPrice()}</div>

                  {!isAdmin && (
                    <div className="flex flex-col gap-4 mt-4">
                      <div className="flex items-center gap-4">
                        <p className="font-medium">Cantidad:</p>
                        <SelectorQuantity
                          setQuantity={setQuantity}
                          quantity={quantity}
                        />
                      </div>
                      <ButtonAddToCart handleClick={handleAddToCart} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sección de preguntas y respuestas - OCUPANDO TODO EL ANCHO */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                Preguntas sobre este producto
              </h2>

              {/* Listado de preguntas y respuestas */}
              <div className="space-y-6">
                {preguntas.length > 0 ? (
                  preguntas
                    .filter(p => p !== null && p !== undefined)
                    .map(pregunta => (
                      <div
                        key={pregunta.id_preguntas}
                        className="bg-gray-50 p-4 rounded-lg shadow-md border space-y-3">
                        {/* Pregunta */}
                        <div className="mb-3">
                          <span className="font-semibold text-blue-600">
                            {userName[pregunta.id_persona] || 'Usuario'}:
                          </span>
                          <p className="text-gray-800 mt-1">
                            {pregunta.descripcion}
                          </p>
                        </div>

                        {/* Respuestas */}
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {respuestas[pregunta.id_preguntas]?.map(respuesta => (
                            <div
                              key={respuesta.id_respuesta}
                              className="pl-4 border-l-2 border-green-200">
                              <span className="font-semibold text-green-600">
                                VeterinariaPupis:
                              </span>
                              <p className="text-gray-700">
                                {respuesta.descripcion}
                              </p>
                            </div>
                          ))}
                        </div>
                        {/* Formulario de respuesta (solo admin) */}
                        {isAdmin && (
                          <div className="mt-3 flex gap-2">
                            <input
                              type="text"
                              value={
                                nuevaRespuesta[pregunta.id_preguntas] || ''
                              }
                              onChange={e =>
                                setNuevaRespuesta(prev => ({
                                  ...prev,
                                  [pregunta.id_preguntas]: e.target.value,
                                }))
                              }
                              placeholder="Escribe tu respuesta..."
                              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={() =>
                                handleResponder(pregunta.id_preguntas)
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
                              Responder
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aún no hay preguntas sobre este producto.
                  </p>
                )}
              </div>

              {/* Formulario para nueva pregunta */}
              <div className="mt-8 pt-4 border-t">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={nuevaPregunta}
                    onChange={e => setNuevaPregunta(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleEnviarPregunta}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition">
                    Enviar pregunta
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando producto...</p>
        )}
      </div>
    </div>
  )
}
