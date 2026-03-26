import { z } from 'zod'

export const updateOpportunitySchema = z.object({
  title: z.string().min(2, 'Заголовок слишком короткий'),
  description: z.string().min(10, 'Опишите вакансию'),
  type: z.enum(['vacancy', 'internship']),
  format: z.enum(['remote', 'office']),
  city: z.string().min(1, 'Укажите город'),
  address: z.string().min(1, 'Укажите адрес'),
  salary_min: z.union([z.number(), z.string()]).pipe(z.coerce.number()),
  salary_max: z.union([z.number(), z.string()]).pipe(z.coerce.number()),
  latitude: z.union([z.number(), z.string()]).pipe(z.coerce.number()),
  longitude: z.union([z.number(), z.string()]).pipe(z.coerce.number()),
  experience_level: z.enum(['junior', 'middle', 'senior', 'lead']),
  tags: z.array(z.string()).min(1, 'Добавьте хотя бы один тег'),
  expires_at: z.string(),
})

export type UpdateOpportunityValues = z.infer<typeof updateOpportunitySchema>
