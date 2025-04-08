import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function createPerson({
  dni,
  nombre,
  apellido,
  telefono,
  correo_electronico,
  domicilio,
  tipo,
}) {
  try {
    if (
      !dni ||
      !nombre ||
      !apellido ||
      !telefono ||
      !correo_electronico ||
      !domicilio
    ) {
      throw new Error(
        'DNI, name, last name, phone, email and address are required',
      )
    }

    const mutation = `
    mutation CreatePersona($dni: String!, $nombre: String!, $apellido: String!, $telefono: String!, $correoElectronico: String!, $domicilio: String!, $tipo: Boolean!) {
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
          nombre,
          apellido,
          telefono,
          correo_electronico,
          domicilio,
          tipo,
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
  } catch (error) {
    console.error(
      'Error creating person:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed crrating person. Please check the GraphQL response.',
    )
  }
}
