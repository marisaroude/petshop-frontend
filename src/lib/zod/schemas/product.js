import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'El nombre del producto es obligatorio'),
  price: z.string().min(1, 'El precio debe ser mayor o igual a 0'),
  stock: z.string().min(1, 'El stock debe ser mayor o igual a 0'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  active: z.boolean(),
  description: z.string(),
})
