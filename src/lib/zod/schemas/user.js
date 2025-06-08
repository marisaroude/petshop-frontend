import { parseLocalDate } from '@/app/utils/date/date'
import { z } from 'zod'

export const userSchema = z.object({
  dni: z.string().min(7, 'El DNI debe tener al menos 7 caracteres'),
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  address: z.string().min(1, 'El domicilio es obligatorio'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(6, 'Teléfono inválido'),
})

export const userSchemaWithFechaBaja = userSchema.extend({
  // fecha_baja: z.union([z.string().datetime(), z.null()]),
  fecha_baja: z
    .string()
    .nonempty('Fecha de baja requerida.')
    .transform(parseLocalDate)
    .refine(date => date instanceof Date, {
      message: 'Fecha de baja requerida.',
    }),
})
