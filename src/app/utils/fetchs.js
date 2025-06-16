import { getAllProducts, getAllPromociones } from '@/lib/graphql'

export const fetchProducts = async () => {
  const response = await getAllProducts()
  return response
}

export const fetchPromos = async () => {
  const response = await getAllPromociones()
  return response
}
