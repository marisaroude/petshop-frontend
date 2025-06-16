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

export async function getAllPromociones() {
  try {
    const query = `
      query Promociones {
        promociones {
          id_promocion
          valor
          fecha_inicio
          fecha_fin
          activo
          id_ps
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

    const data = response.data.data.promociones
    console.log('data from get all promos', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all promos:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all promos. Please check the GraphQL response.',
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

export async function getAllFacturas() {
  try {
    const query = `
    query GetAllFacturaWithDetails {
      getAllFacturaWithDetails {
        factura {
          id_factura
          id_pago
          fecha
          total
        }
        pago {
          id_pago
          id_mercadopago
          id_carrito
          fecha
          monto
        }
        detalles {
          id_df
          cantidad
          precio
          id_ps
          id_factura
        }
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
    console.log('data from get all facturas', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all facturas:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all facturas. Please check the GraphQL response.',
    )
  }
}

export async function getFacturaById({ id_factura }) {
  try {
    const query = `
      query GetFacturaWithDetailsById($id_factura: Int!) {
        getFacturaWithDetailsById(id_factura: $id_factura) {
          factura {
            id_factura
            id_pago
            fecha
            total
          }
          pago {
            id_pago
            id_mercadopago
            id_carrito
            fecha
            monto
          }
          detalles {
            id_df
            cantidad
            precio
            id_ps
            id_factura
          }
        }
      }
        `
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: {
          id_factura,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from get factura by id', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching factura by id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin factura by id. Please check the GraphQL response.',
    )
  }
}

export async function getAllProveedores() {
  try {
    const query = `
        query Proveedores {
          proveedores {
            id_proveedor
            nombre
            cuit
            activo
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

    const data = response.data.data.proveedores
    console.log('data from get all proveedores', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all proveedores:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all proveedores. Please check the GraphQL response.',
    )
  }
}

export async function getProveedorById({ id_proveedor }) {
  console.log('id_proveedor', id_proveedor)
  if (!id_proveedor) {
    throw new Error('ID is required')
  }
  try {
    const query = `
    query ProveedorById($id_proveedor: Int!) {
      proveedorById(id_proveedor: $id_proveedor) {
        id_proveedor
        nombre
        cuit
        activo
      }
    }
  `
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id_proveedor },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data.data.proveedorById)
    return response.data.data.proveedorById
  } catch (error) {
    console.error(
      'Error fetching proveedor by id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching proveedor by id:. Please check the GraphQL response.',
    )
  }
}

export async function getMascotaByPersonaId({ id_persona }) {
  if (!id_persona) {
    throw new Error('ID is required')
  }
  try {
    const query = `
    query MascotasByPersona($id_persona: Int!) {
      mascotasByPersona(id_persona: $id_persona) {
        id_mascota
        id_persona
        nombre
        tipo
        raza
        descripcion
        fecha_baja
        image
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
    console.log(response.data.data.mascotasByPersona)
    return response.data.data.mascotasByPersona
  } catch (error) {
    console.error(
      'Error fetching mascotas by persona id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching mascotas by persona id:. Please check the GraphQL response.',
    )
  }
}

export async function getMascotaById({ id_mascota }) {
  if (!id_mascota) {
    throw new Error('ID is required')
  }
  try {
    const query = `
      query MascotaById($id_mascota: Int!) {
        mascotaById(id_mascota: $id_mascota) {
          id_mascota
          id_persona
          nombre
          tipo
          raza
          descripcion
          fecha_baja
          image
        }
      }
  `
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id_mascota },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    console.log(response.data.data.mascotaById)
    return response.data.data.mascotaById
  } catch (error) {
    console.error(
      'Error fetching mascotas by id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching mascotas by id:. Please check the GraphQL response.',
    )
  }
}

export async function getAllMascotas() {
  try {
    const query = `
    query Mascotas {
      mascotas {
        id_mascota
        id_persona
        nombre
        tipo
        raza
        descripcion
        fecha_baja
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

    const data = response.data.data.mascotas
    console.log('data from get all mascotas', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all mascotas:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all mascotas. Please check the GraphQL response.',
    )
  }
}

export async function getAllIngresosProductos() {
  try {
    const query = `
    query IngresosProductos {
      ingresosProductos {
        id_ip
        id_proveedor
        subtotal
        cantidad
        id_ps
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

    const data = response.data.data.ingresosProductos
    console.log('data from get all ingresos productos', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching all ingresos productos:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all ingresos productos. Please check the GraphQL response.',
    )
  }
}

export async function pagosByPersona({ id_persona }) {
  if (!id_persona) {
    throw new Error('ID is required')
  }
  try {
    const query = `
    query PagosByPersonaId($id_persona: Int!) {
      pagosByPersonaId(id_persona: $id_persona) {
        pago {
          id_pago
          id_mercadopago
          id_carrito
          fecha
          monto
        }
        factura {
          id_factura
          id_pago
          fecha
          total
          detalles_factura {
            id_df
            cantidad
            precio
            id_ps
            id_factura
            producto_servicio {
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
        }
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
    console.log(response.data.data.pagosByPersonaId)
    return response.data.data.pagosByPersonaId
  } catch (error) {
    console.error(
      'Error fetching pagos by persona id:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Error fetching pagos by persona id:. Please check the GraphQL response.',
    )
  }
}

export async function getRespuestasByPreguntaId({ id_preguntas }) {
  try {
    if (!id_preguntas) {
      throw new Error('ID de pregunta es requerido')
    }

    const query = `
      query RespuestasByPreguntaId($id_preguntas: Int!) {
        respuestasByPreguntaId(id_preguntas: $id_preguntas) {
          id_respuesta
          descripcion
          id_preguntas
        }
      }
    `
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: { id_preguntas: parseInt(id_preguntas) },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data.data.respuestasByPreguntaId
    console.log('Data from get respuestas:', data)
    return data
  } catch (error) {
    console.error(
      'Error fetching respuestas:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed fetchin all facturas. Please check the GraphQL response.',
    )
  }
}
