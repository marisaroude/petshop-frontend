import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getPersonByEmail({ email }) {
  console.log('email', email)
  if (!email) {
    throw new Error('Email is required')
  }
  try {
    const query = `
            query getPersonByEmail($email: String!) {
            getPersonByEmail(email: $email) {
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
        query,
        variables: { email },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data', data)
    return data.data.getPersonByEmail
  } catch (error) {
    console.error(
      'Error fetching person by email:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetching person by email. Please check the GraphQL response.',
    )
  }
}

export async function getAllPerson() {
  console.log(' api url', API_URL)
  try {
    const query = `
          query Personas {
            personas {
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
        query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data', data)
    return data.data.personas
  } catch (error) {
    console.error(
      'Error fetching all person:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all person. Please check the GraphQL response.',
    )
  }
}
