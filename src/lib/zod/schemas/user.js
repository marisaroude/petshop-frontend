import { z } from 'zod'

export const registerSchema = z.object({
  dni: z.string().min(7, 'El DNI debe tener al menos 7 caracteres'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  address: z.string().min(1, 'El domicilio es obligatorio'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(6, 'Teléfono inválido'),
})
