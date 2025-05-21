import { getAllProducts } from '@/lib/graphql'
import { allProducts } from '../signals/products'

export const fetchProducts = async () => {
  const response = await getAllProducts()
  if (response) {
    allProducts.value = response
  }
}
