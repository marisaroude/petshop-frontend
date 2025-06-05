import { z } from 'zod'

export const proveedorSchema = z.object({
  cuit: z.string().min(11, 'El cuit debe tener 11 caracteres'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  active: z.boolean(),
})
