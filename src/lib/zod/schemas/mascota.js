import { z } from 'zod'

export const mascotaSchema = z.object({
  name: z.string().min(1, 'El nombre de la mascota es obligatorio'),
  type: z.string().min(1, 'El tipo de la mascota es obligatoria'),
  description: z.string(),
  race: z.string(),
})

export const mascotaSchemaWithFechaBaja = mascotaSchema.extend({
  discharge_date: z.union([z.string().datetime(), z.null()]),
})
