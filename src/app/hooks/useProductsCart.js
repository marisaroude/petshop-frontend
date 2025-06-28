import { allProductsCart } from '../signals/cart'

export const useProductsCart = () => {
  const handleProductsCart = data => {
    const index = allProductsCart.value.findIndex(p => p.id_pc === data.id_pc)

    if (index !== -1) {
      allProductsCart.value = allProductsCart.value.map(product =>
        product.id_pc === data.id_pc ? { ...product, ...data } : product,
      )
    } else {
      allProductsCart.value = [...allProductsCart.value, data]
    }
  }

  const handleRemoveProduct = id_pc => {
    allProductsCart.value = allProductsCart.value.filter(
      item => item.id_pc !== id_pc,
    )
  }

  return {
    handleProductsCart,
    handleRemoveProduct,
    productsCart: allProductsCart,
  }
}
