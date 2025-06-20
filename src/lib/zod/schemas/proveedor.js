import { z } from 'zod'

export const proveedorSchema = z.object({
  cuit: z.string().length(11, 'El CUIT debe tener exactamente 11 dígitos'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  active: z.boolean(),
})
