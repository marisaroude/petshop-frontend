import {
  getAllMascotas,
  getAllProducts,
  getAllProductsCartById,
  getAllPromociones,
  getAllProveedores,
} from '@/lib/graphql'

export const fetchProducts = async () => {
  const response = await getAllProducts()
  return response
}

export const fetchPromos = async () => {
  const response = await getAllPromociones()
  return response
}

export const fetchProveedores = async () => {
  const response = await getAllProveedores()
  return response
}

export const fetchsMascotas = async () => {
  const response = await getAllMascotas()
  return response
}

export const fetchsProductsCartById = async id => {
  const response = await getAllProductsCartById({ id_carrito: id })
  return response
}
