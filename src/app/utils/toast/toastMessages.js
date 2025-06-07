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

export function productSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Producto ${updated ? 'modificado' : 'creado'} exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function promoSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Promo ${updated ? 'modificada' : 'creada'} exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function proveedorSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Proveedor ${updated ? 'modificado' : 'creado'} exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function ingresoSuccessfullyCreated() {
  toast.success(`Ingreso creado exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function userUpdatedSuccesfully() {
  toast.success('Usuario actualizado exitosamente', {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function userCanceledSuccessfully() {
  toast.success('Usuario dado de baja exitosamente', {
    closeButton: false,
    hideProgressBar: true,
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
