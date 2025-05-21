const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/mercadopago`

export const onSubmitMercadoPago = async (setLoading, items) => {
  setLoading(true)
  try {
    const response = await fetch(`${API_URL}/create_preference`, {
      method: 'POST',
      body: JSON.stringify({ items }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { id } = await response.json()
    if (!id) throw Error('Error trying to get ID')
    // Redirige al usuario a la interfaz de pago de Mercado Pago
    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${id}`
  } catch (error) {
    setLoading(false)
    console.error('Error al iniciar el pago:', error)
  } finally {
    setLoading(false)
  }
}
