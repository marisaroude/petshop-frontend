'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  getAllPreguntas,
  getAllRespuestas,
  createRespuesta,
} from '@/lib/graphql'

export default function PreguntasConRespuestas() {
  const [preguntas, setPreguntas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [preguntasData, respuestasData] = await Promise.all([
        getAllPreguntas(),
        getAllRespuestas(),
      ])

      const preguntasConRespuestas = preguntasData.map(pregunta => {
        const respuestas = respuestasData.filter(
          respuesta => respuesta.id_preguntas === pregunta.id_preguntas,
        )
        return {
          ...pregunta,
          respuestas,
          tieneRespuestas: respuestas.length > 0,
          respuestaTexto: '', // para el textarea
        }
      })

      preguntasConRespuestas.sort((a, b) => {
        if (a.tieneRespuestas === b.tieneRespuestas) return 0
        return a.tieneRespuestas ? 1 : -1
      })

      setPreguntas(preguntasConRespuestas)
    } catch (err) {
      setError('Error al cargar datos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const preguntasSinResponder = preguntas.filter(p => !p.tieneRespuestas).length

  if (loading) return <div className="text-center py-8">Cargando...</div>
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Preguntas Pendientes
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-500">Total: {preguntas.length} preguntas</p>
          {preguntasSinResponder > 0 && (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {preguntasSinResponder} sin responder
            </span>
          )}
        </div>
      </header>

      {preguntas.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg">
            No hay preguntas para responder
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {preguntas.map((pregunta, i) => {
            const estadoColor = pregunta.tieneRespuestas
              ? 'border-green-500'
              : 'border-red-500'
            const estadoTexto = pregunta.tieneRespuestas
              ? 'text-green-600 bg-green-50'
              : 'text-red-600 bg-red-50'

            return (
              <article
                key={pregunta.id_preguntas}
                className={`bg-white border-l-4 ${estadoColor} rounded-lg shadow-md p-6`}>
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-1">
                    {pregunta.descripcion}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div>
                    <span className="font-medium">Producto:</span>{' '}
                    <Link
                      href={`/product/${pregunta.id_ps}`}
                      className="text-blue-600 hover:underline"
                      target="_blank">
                      Ver producto
                    </Link>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${estadoTexto}`}>
                      {pregunta.tieneRespuestas ? 'Respondida' : 'Pendiente'}
                    </span>
                  </div>
                </div>

                {pregunta.tieneRespuestas ? (
                  <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-medium text-gray-600">
                      Respuestas:
                    </h4>
                    {pregunta.respuestas.map((respuesta, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">{respuesta.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Respondido por: VeterinariaPupis
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    <textarea
                      className="w-full border rounded p-2 text-sm"
                      placeholder="Escribí tu respuesta..."
                      value={pregunta.respuestaTexto}
                      onChange={e => {
                        const nuevasPreguntas = [...preguntas]
                        nuevasPreguntas[i].respuestaTexto = e.target.value
                        setPreguntas(nuevasPreguntas)
                      }}
                    />
                    <button
                      onClick={async () => {
                        if (!pregunta.respuestaTexto?.trim()) return
                        try {
                          await createRespuesta({
                            id_preguntas: pregunta.id_preguntas,
                            descripcion: pregunta.respuestaTexto.trim(),
                          })
                          await fetchData()
                        } catch (err) {
                          alert('Error al enviar la respuesta')
                          console.error(err)
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm">
                      Enviar respuesta
                    </button>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
