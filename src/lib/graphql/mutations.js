import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

//#region Persona
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
    mutation CreatePersona($dni: String!, $nombre: String!, $apellido: String!,$telefono: String!, $correoElectronico: String!, $domicilio: String!, $tipo: Boolean) {
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
    console.log('data from create user', data)
    return data
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error('Failed crrating user. Please check the GraphQL response.')
  }
}

export async function updateUser({ id_persona, input }) {
  try {
    if (!id_persona || !input) {
      throw new Error('ID and input are required')
    }

    const mutation = `
    mutation UpdatePersona($id_persona: Int!, $input: UpdatePersonaInput!) {
      updatePersona(id_persona: $id_persona, input: $input) {
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
          id_persona,
          input: {
            dni,
            nombre: input.name,
            apellido: input.lastName,
            telefono: input.phone,
            correoElectronico: input.email,
            domicilio: input.address,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from update user', data)
    return data
  } catch (error) {
    console.error(
      'Error updating user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error('Failed updating user. Please check the GraphQL response.')
  }
}

export async function cancelPersona({ id_persona }) {
  try {
    if (!id_persona) {
      throw new Error('ID is required')
    }

    const mutation = `
      mutation CancelPersona($id_persona: Int!) {
        cancelPersona(id_persona: $id_persona) {
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
          id_persona,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from cancel user', data)
    return data
  } catch (error) {
    console.error(
      'Error cancelling user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed cancelling user. Please check the GraphQL response.',
    )
  }
}
//#endregion Persona

//#region Carrito

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
    console.log('data from add to cart', data)
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

export async function removeProductCart({ id_pc }) {
  try {
    if (!id_pc) {
      throw new Error('id_pc is required')
    }

    const mutation = `
    mutation DeleteProductosCarrito($id_pc: Int!) {
        deleteProductosCarrito(id_pc: $id_pc) {
          message
        }
      }
        `
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          id_pc: id_pc,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data.data.deleteProductosCarrito
    console.log('data from remove product cart', data)
    return data
  } catch (error) {
    console.error(
      'Error deleting product to cart :',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed Error deleting product to cart. Please check the GraphQL response.',
    )
  }
}
//#endregion Carrito

//#region Producto Servicio

export async function createProductoServicio({
  name,
  price,
  stock,
  category,
  active,
  description,
  image,
}) {
  try {
    if (!price || !name || !stock || !category) {
      throw new Error(
        'DNI, name, last name, phone, email and address are required',
      )
    }

    const mutation = `
    mutation CreateProductoServicio($nombre: String!, $precio: Float!, $stock: Int!, $categoria: String!, $activo: Boolean!, $descripcion: String, $image: String) {
      createProductoServicio(nombre: $nombre, precio: $precio, stock: $stock, categoria: $categoria, activo: $activo, descripcion: $descripcion, image: $image) {
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
        query: mutation,
        variables: {
          nombre: name,
          precio: parseFloat(price),
          stock: Number(stock),
          categoria: category,
          descripcion: description,
          activo: active,
          image: image,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from create producto/servicio', data)
    return data
  } catch (error) {
    console.error(
      'Error creating producto/servicio:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed creating producto/servicio. Please check the GraphQL response.',
    )
  }
}

export async function updateProductoServicio({ id_ps, input }) {
  try {
    if (!id_ps || !input) {
      throw new Error('ID and input are required')
    }

    const { name, price, stock, category, active, description, image } = input
    const mutation = `
    mutation UpdateProductoServicio($id_ps: Int!, $input: UpdateProductoServicioInput!) {
      updateProductoServicio(id_ps: $id_ps, input: $input) {
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
        query: mutation,
        variables: {
          id_ps: id_ps,
          input: {
            nombre: name,
            precio: parseInt(price),
            stock: parseInt(stock),
            categoria: category,
            activo: active,
            descripcion: description,
            image,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('response', response)
    const data = response.data
    console.log('data from update producto/servicio', data)
    return data
  } catch (error) {
    console.error(
      'Error updating producto/servicio:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed updating producto/servicio. Please check the GraphQL response.',
    )
  }
}

//#endregion Producto Servicio

//#region Promocion

export async function createPromo({
  cost,
  start_date,
  end_date,
  active,
  id_ps,
}) {
  try {
    if (!cost || !start_date || !end_date || !active || !id_ps) {
      throw new Error(
        'cost, start date, end date, active and product are required',
      )
    }

    const mutation = `
    mutation CreatePromocion($valor: Float!, $fecha_inicio: String!, $fecha_fin: String!, $activo: Boolean!, $id_ps: Int!) {
      createPromocion(valor: $valor, fecha_inicio: $fecha_inicio, fecha_fin: $fecha_fin, activo: $activo, id_ps: $id_ps) {
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
        query: mutation,
        variables: {
          valor: parseFloat(cost),
          fecha_inicio: start_date,
          fecha_fin: end_date,
          activo: active,
          id_ps: parseInt(id_ps),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from create promo', data)
    return data
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error('Failed crrating promo. Please check the GraphQL response.')
  }
}

export async function updatePromocion({ id_promocion, input }) {
  try {
    if (!id_promocion || !input) {
      throw new Error('ID and input are required')
    }

    const { start_date, end_date, cost, id_ps, active } = input
    const mutation = `
      mutation UpdatePromocion($id_promocion: Int!, $input: UpdatePromocionInput!) {
        updatePromocion(id_promocion: $id_promocion, input: $input) {
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
        query: mutation,
        variables: {
          id_promocion: parseInt(id_promocion),
          input: {
            id_ps: parseInt(id_ps),
            fecha_inicio: start_date,
            fecha_fin: end_date,
            valor: parseFloat(cost),
            activo: active,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log('response', response)
    const data = response.data
    console.log('data from update promocion', data)
    return data
  } catch (error) {
    console.error(
      'Error updating promocion:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed updating promocion. Please check the GraphQL response.',
    )
  }
}

//#endregion Promocion

//#region Pregunta

export async function createPregunta({
  description,
  personId,
  productId,
  status,
}) {
  try {
    if (!description || !personId || !productId) {
      throw new Error('Description, person ID and product ID are required')
    }

    const mutation = `
      mutation CreatePregunta(
        $descripcion: String!,
        $id_persona: Int!,
        $id_ps: Int!,
        $estado: Boolean
      ) {
        createPregunta(
          descripcion: $descripcion,
          id_persona: $id_persona,
          id_ps: $id_ps,
          estado: $estado
        ) {
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
        query: mutation,
        variables: {
          descripcion: description,
          id_persona: parseInt(personId),
          id_ps: parseInt(productId),
          estado: status || false,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('Data from create question:', data)
    return data
  } catch (error) {
    console.error(
      'Error creating question:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed creating question. Please check the GraphQL response.',
    )
  }
}

//#endregion Preguntas
