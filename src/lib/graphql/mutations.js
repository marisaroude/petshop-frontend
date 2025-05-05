import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createUser({
  dni,
  name,
  lastName,
  phone,
  email,
  address,
  type,
}) {
  try {
    if (!dni || !name || !lastName || !phone || !email || !address) {
      throw new Error(
        'DNI, name, last name, phone, email and address are required',
      )
    }

    const mutation = `
    mutation CreatePersona($dni: String!, $nombre: String!, $apellido: String!, $telefono: String!, $correoElectronico: String!, $domicilio: String!, $tipo: Boolean) {
    createPersona(dni: $dni, nombre: $nombre, apellido: $apellido, telefono: $telefono, correo_electronico: $correoElectronico, domicilio: $domicilio, tipo: $tipo) {
        id_persona
        dni
        nombre
        apellido
        telefono
        correo_electronico
        domicilio
        tipo
        fecha_baja
    }
    }
        `
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          dni,
          nombre: name,
          apellido: lastName,
          telefono: phone,
          correoElectronico: email,
          domicilio: address,
          tipo: type,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data', data)
    return data
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error('Failed crrating user. Please check the GraphQL response.')
  }
}

export async function addToCart({ quantity, id_cart, id_ps, subtotal }) {
  try {
    if (!quantity || !id_cart || !id_ps || !subtotal) {
      throw new Error('Quanrity, id_cart, id_ps and subtotal are required')
    }

    const mutation = `
    mutation CreateProductoCarrito($cantidad: Int!, $subtotal: Float!, $id_ps: Int!, $id_carrito: Int!) {
      createProductoCarrito(cantidad: $cantidad, subtotal: $subtotal, id_ps: $id_ps, id_carrito: $id_carrito) {
        id_pc
        cantidad
        subtotal
        id_ps
        id_carrito
      }
    }
        `
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          cantidad: quantity,
          subtotal,
          id_carrito: id_cart,
          id_ps,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data', data)
    return data
  } catch (error) {
    console.error(
      'Error adding product to cart :',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed Error adding product to cart. Please check the GraphQL response.',
    )
  }
}
