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

export function productsSuccesfullyAdded(router) {
  toast.success(
    'Productos añadidos al carrito, clickeame para ir al carrito!',
    {
      closeButton: false,
      hideProgressBar: true,
      onClick: () => {
        router.push('/cart')
      },
    },
  )
}

export function productSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Producto ${updated ? 'modificado' : 'creado'} exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function serviceSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Servicio ${updated ? 'modificado' : 'creado'} exitosamente`, {
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

export function mascotaSuccesfullyCreatedOrUpdate(updated) {
  toast.success(`Mascota ${updated ? 'modificada' : 'creada'} exitosamente`, {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function mascotaCanceledSuccessfully() {
  toast.success('Mascota dada de baja exitosamente', {
    closeButton: false,
    hideProgressBar: true,
  })
}

export function mascotaRegisteredSuccessfully() {
  toast.success('Mascota dada de alta exitosamente', {
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

export function userRegisteredSuccessfully() {
  toast.success('Usuario dado de alta exitosamente', {
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

export function productSuccesfullyRemoved(message) {
  toast.success(message, {
    closeButton: false,
    hideProgressBar: true,
  })
}
