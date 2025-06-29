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
  console.log('input', input)
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
            dni: input.dni,
            nombre: input.name,
            apellido: input.lastName,
            telefono: input.phone,
            correo_electronico: input.email,
            domicilio: input.address,
            fecha_baja: input.discharge_date,
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

export async function registerPersona({ id_persona }) {
  try {
    if (!id_persona) {
      throw new Error('ID is required')
    }

    const mutation = `
      mutation RegisterPersona($id_persona: Int!) {
        registerPersona(id_persona: $id_persona) {
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
    console.log('data from register user', data)
    return data
  } catch (error) {
    console.error(
      'Error registering user:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed registering user. Please check the GraphQL response.',
    )
  }
}
//#endregion Persona

//#region Carrito

export async function addToCart({
  quantity,
  id_cart,
  id_ps,
  subtotal,
  service_date,
}) {
  try {
    if (!quantity || !id_cart || !id_ps || !subtotal) {
      throw new Error('Quanrity, id_cart, id_ps and subtotal are required')
    }

    const mutation = `
    mutation CreateProductoCarrito($cantidad: Int!, $subtotal: Float!, $id_ps: Int!, $id_carrito: Int!, $fecha_servicio: String) {
      createProductoCarrito(cantidad: $cantidad, subtotal: $subtotal, id_ps: $id_ps, id_carrito: $id_carrito, fecha_servicio: $fecha_servicio) {
        id_pc
        cantidad
        subtotal
        id_ps
        id_carrito
        fecha_servicio
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
          fecha_servicio: service_date,
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

export async function updateProductCart({ id_pc, input }) {
  try {
    if (!id_pc || !input) {
      throw new Error('ID and input are required')
    }

    const mutation = `
    mutation UpdateProductoCarrito($id_pc: Int!, $input: UpdateProductoCarritoInput!) {
      updateProductoCarrito(id_pc: $id_pc, input: $input) {
        id_pc
        cantidad
        subtotal
        id_ps
        id_carrito
        fecha_servicio
      }
    }
        `
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          id_pc: id_pc,
          input: {
            cantidad: input.quantity,
            subtotal: input.subtotal,
            id_ps: input.id_ps,
            id_carrito: input.id_cart,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data.data.updateProductoCarrito
    console.log('data from update  cart', data)
    return data
  } catch (error) {
    console.error(
      'Error updating product from cart :',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed Error updating product from cart. Please check the GraphQL response.',
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
  services_dates,
}) {
  try {
    let isService = false
    if (category === 'servicios') {
      isService = true
    }
    if (!price || !name || (!stock && !isService) || !category) {
      throw new Error(
        'DNI, name, last name, phone, email and address are required',
      )
    }

    const mutation = `
    mutation CreateProductoServicio($nombre: String!, $precio: Float!, $stock: Int!, $categoria: String!, $activo: Boolean!, $descripcion: String, $image: String, $fechas_servicios: [String]) {
      createProductoServicio(nombre: $nombre, precio: $precio, stock: $stock, categoria: $categoria, activo: $activo, descripcion: $descripcion, image: $image, fechas_servicios: $fechas_servicios) {
        id_ps
        nombre
        precio
        stock
        descripcion
        categoria
        activo
        image
        fechas_servicios
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
          stock: isService ? 9999 : Number(stock),
          categoria: category,
          descripcion: description,
          activo: active,
          image: image,
          fechas_servicios: services_dates,
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

    const {
      name,
      price,
      stock,
      category,
      active,
      description,
      image,
      services_dates,
    } = input
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
        fechas_servicios
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
            fechas_servicios: services_dates,
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
      mutation CreatePregunta($descripcion: String!,$id_persona: Int!,$id_ps: Int!,$estado: Boolean) {
        createPregunta(descripcion: $descripcion,id_persona: $id_persona,id_ps: $id_ps,estado: $estado
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

//#region Respuesta
export async function createRespuesta({ descripcion, id_preguntas }) {
  try {
    if (!descripcion || !id_preguntas) {
      throw new Error('Description, and ID and preg ID are required')
    }

    const mutation = `
      mutation CreateRespuesta($descripcion: String!,$id_preguntas: Int!) {
        createRespuesta(descripcion: $descripcion,id_preguntas: $id_preguntas) {
          id_respuesta
          descripcion
          id_preguntas
        }
      }
    `

    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          descripcion: descripcion,
          id_preguntas: parseInt(id_preguntas),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('Data from create respuesta:', data)
    return data
  } catch (error) {
    console.error(
      'Error creating respuesta:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed creating respuesta. Please check the GraphQL response.',
    )
  }
}

//#endregion Respuesta

//#region Proveedor
export async function createProveedor({ name, cuit, active }) {
  try {
    if (!name || !cuit || !active) {
      throw new Error('name, cuit, and active are required')
    }

    const mutation = `
      mutation CreateProveedor($nombre: String!, $cuit: String!, $activo: Boolean!) {
        createProveedor(nombre: $nombre, cuit: $cuit, activo: $activo) {
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
        query: mutation,
        variables: {
          nombre: name,
          activo: active,
          cuit: cuit,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from create proveedor', data)
    return data
  } catch (error) {
    console.error(
      'Error creating proveedor:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed crrating proveedor. Please check the GraphQL response.',
    )
  }
}

export async function updateProveedor({ id_proveedor, input }) {
  try {
    if (!id_proveedor || !input) {
      throw new Error('ID and input are required')
    }

    const { name, cuit, active } = input
    const mutation = `
    mutation UpdateProveedor($id_proveedor: Int!, $input: UpdateProveedorInput!) {
      updateProveedor(id_proveedor: $id_proveedor, input: $input) {
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
        query: mutation,
        variables: {
          id_proveedor: parseInt(id_proveedor),
          input: {
            nombre: name,
            cuit: cuit,
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
    console.log('data from update proveedor', data)
    return data
  } catch (error) {
    console.error(
      'Error updating proveedor:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed updating proveedor. Please check the GraphQL response.',
    )
  }
}
//#endregion Proveedor

// #region Ingreso Producto
export async function createIngresoProducto({
  id_proveedor,
  subtotal,
  id_ps,
  quantity,
  dateEntry,
}) {
  try {
    if (!quantity || !id_proveedor || !id_ps || !subtotal || !dateEntry) {
      throw new Error(
        'Quantity, id_proveedor, id_ps, date entry and subtotal are required',
      )
    }

    const mutation = `
    mutation CreateIngresoProducto($id_proveedor: Int!, $fecha_ingreso: String! ,$subtotal: Float!, $cantidad: Int!, $id_ps: Int!) {
      createIngresoProducto(id_proveedor: $id_proveedor, fecha_ingreso: $fecha_ingreso, subtotal: $subtotal, cantidad: $cantidad, id_ps: $id_ps) {
        ingreso {
          fecha_ingreso
          id_ip
          id_proveedor
          subtotal
          cantidad
          id_ps
        }
        updatedProduct {
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
        `
    const response = await axios.post(
      API_URL,
      {
        query: mutation,
        variables: {
          cantidad: parseInt(quantity),
          subtotal: parseFloat(subtotal),
          id_proveedor: id_proveedor,
          id_ps,
          fecha_ingreso: dateEntry,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from ingreso producto', data)
    return data
  } catch (error) {
    console.error(
      'Error adding ingreso producto :',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed Error adding ingreso producto. Please check the GraphQL response.',
    )
  }
}
//#endregion Ingreso Producto

//#region Mascota
export async function createMascota({
  id_persona,
  name,
  type,
  race,
  description,
  image,
}) {
  try {
    if (!id_persona || !type || !name) {
      throw new Error('id_persona, type and name are required')
    }

    const mutation = `
    mutation CreateMascota($id_persona: Int!, $nombre: String!, $tipo: String!, $raza: String, $descripcion: String, $fecha_baja: String, $image: String) {
      createMascota(id_persona: $id_persona, nombre: $nombre, tipo: $tipo, raza: $raza, descripcion: $descripcion, fecha_baja: $fecha_baja, image: $image) {
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
        query: mutation,
        variables: {
          nombre: name,
          id_persona: id_persona,
          tipo: type,
          raza: race,
          descripcion: description,
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
    console.log('data from create mascota', data)
    return data
  } catch (error) {
    console.error(
      'Error adding create mascota :',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed Error adding create mascota. Please check the GraphQL response.',
    )
  }
}

export async function updateMascota({ id_mascota, input }) {
  try {
    if (!id_mascota || !input) {
      throw new Error('ID and input are required')
    }

    const mutation = `
    mutation UpdateMascota($id_mascota: Int!, $input: UpdateMascotaInput!) {
      updateMascota(id_mascota: $id_mascota, input: $input) {
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
        query: mutation,
        variables: {
          id_mascota,
          input: {
            id_persona: input.id_persona,
            nombre: input.name,
            tipo: input.type,
            raza: input.race,
            descripcion: input.description,
            fecha_baja: input.discharge_date,
            image: input.image,
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
    console.log('data from update mascota', data)
    return data
  } catch (error) {
    console.error(
      'Error updating mascota:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed updating mascota. Please check the GraphQL response.',
    )
  }
}

export async function cancelMascota({ id_mascota }) {
  try {
    if (!id_mascota) {
      throw new Error('ID is required')
    }

    const mutation = `
      mutation CancelMascota($id_mascota: Int!) {
        cancelMascota(id_mascota: $id_mascota) {
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
        query: mutation,
        variables: {
          id_mascota,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from cancel mascota', data)
    return data
  } catch (error) {
    console.error(
      'Error cancelling mascota:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed cancelling mascota. Please check the GraphQL response.',
    )
  }
}

export async function registerMascota({ id_mascota }) {
  try {
    if (!id_mascota) {
      throw new Error('ID is required')
    }

    const mutation = `
      mutation RegisterMascota($id_mascota: Int!) {
        registerMascota(id_mascota: $id_mascota) {
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
        query: mutation,
        variables: {
          id_mascota,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = response.data
    console.log('data from register mascota', data)
    return data
  } catch (error) {
    console.error(
      'Error registering mascota:',
      error.response ? error.response.data : error.message,
    )
    throw new Error(
      'Failed registering mascota. Please check the GraphQL response.',
    )
  }
}
//#endregion Mascota
