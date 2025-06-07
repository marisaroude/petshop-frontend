import { z } from 'zod'

export const ingresoSchema = z.object({
  subtotal: z.string().min(1, 'El subtotal debe ser mayor o igual a 0'),
  quantity: z.string().min(1, 'La cantidad debe ser mayor o igual a 0'),
  id_ps: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val), { message: 'Producto requerido' }),
  id_proveedor: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val), { message: 'Proveedor requerido' }),
})
