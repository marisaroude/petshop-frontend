import { parseLocalDate } from '@/app/utils/date/date'
import { z } from 'zod'

export const promocionSchema = z.object({
  start_date: z
    .string()
    .nonempty('Fecha de inicio requerida.')
    .transform(parseLocalDate)
    .refine(date => date instanceof Date, {
      message: 'Fecha de inicio requerida.',
    }),

  end_date: z
    .string()
    .nonempty('Fecha de fin requerida.')
    .transform(parseLocalDate)
    .refine(date => date instanceof Date, {
      message: 'Fecha de inicio requerida.',
    }),

  cost: z.string().nonempty('El valor de descuento es requerido'),
  id_ps: z
    .string()
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val), { message: 'Producto requerido' }),
  active: z.boolean(),
})
