import { toast } from 'react-toastify'

export function productSuccesfullyAdded(router) {
  toast.success('Producto añadido al carrito, clickeame para ir al carrito!', {
    closeButton: false,
    hideProgressBar: true,
    onClick: () => {
      router.push('/cart')
    },
  })
}

export function errorMessage(message) {
  toast.error(message, {
    closeButton: true,
    hideProgressBar: true,
  })
}

export function productSuccesfullyRemoved(message, getProductCarrito) {
  toast.success(message, {
    closeOnClick: true,
    onClose: () => {
      getProductCarrito()
    },
  })
}
