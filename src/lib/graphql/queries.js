import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

export async function getPersonByEmail({ email }) {
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

    const data = response.data.data.getPersonByEmail
    console.log('data from get person by email ', data)
    return data
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

    const data = response.data.data.personas
    console.log('data from get all person', data)
    return data
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

export async function getAllProducts() {
  try {
    const query = `
          query ProductosServicios {
          productosServicios {
            id_ps
            nombre
            precio
            stock
            descripcion
            categoria
            activo
            image
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

    const data = response.data.data.productosServicios
    console.log('data from get all products', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all products:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all products. Please check the GraphQL response.',
    )
  }
}

export async function getProductById({ id_ps }) {
  if (!id_ps) {
    throw new Error('ID is required')
  }
  try {
    const query = `
            query ProductoServicioById($id_ps: Int!) {
            productoServicioById(id_ps: $id_ps) {
              id_ps
              nombre
              precio
              stock
              descripcion
              categoria
              activo
              image
            }
          }
          `

    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id_ps },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data.data.productoServicioById
    console.log('data from get product by id', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetching product by id. Please check the GraphQL response.',
    )
  }
}

export async function getAllProductsCartById({ id_carrito }) {
  if (!id_carrito) {
    throw new Error('ID Cart is required')
  }
  try {
    const query = `
        query ProductosCarritosById($id_carrito: Int!) {
        productosCarritosById(id_carrito: $id_carrito) {
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
        query,
        variables: { id_carrito },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data.data.productosCarritosById
    console.log('data from get all products cart by id', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching products cart by id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetching products cart by id. Please check the GraphQL response.',
    )
  }
}

export async function getPreguntasByProductId({ id_ps }) {
  if (!id_ps) {
    throw new Error('ID is required')
  }
  try {
    const query = `
    query PreguntasByProductId($id_ps: Int!) {
    preguntasByProductId(id_ps: $id_ps) {
    id_preguntas
    descripcion
    estado
    id_persona
    id_ps
  }
}
  `
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id_ps },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data.data.preguntasByProductId)
    return response.data.data.preguntasByProductId
  } catch (error) {
    console.error(
      'Error fetching question by product id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching question by product  id:. Please check the GraphQL response.',
    )
  }
}

export async function getPersonById({ id_persona }) {
  if (!id_persona) {
    throw new Error('ID persona is required')
  }
  try {
    const query = `
        query getPersonById($id_persona: Int!) {
            getPersonById (id_persona: $id_persona) {
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
        variables: { id_persona },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data.data.getPersonById)
    return response.data.data.getPersonById
  } catch (error) {
    console.error(
      'Error fetching question by product id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching question by product  id:. Please check the GraphQL response.',
    )
  }
}
