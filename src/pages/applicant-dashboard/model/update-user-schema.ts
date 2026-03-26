import { z } from 'zod'

export const updateUserInfoSchema = z.object({
  email: z.string().email('Некорректный email'),
  display_name: z.string().min(2, 'Слишком короткое имя'),
  university: z.string().min(2, 'Укажите учебное заведение').optional().or(z.literal('')),
  course: z.number().min(1, 'Минимум 1 курс').max(6, 'Максимум 6 курс').optional(),
  portfolio_url: z.string().url('Введите корректную ссылку').optional().or(z.literal('')),
  github_url: z.string().url('Введите корректную ссылку').optional().or(z.literal('')),
})

export type UpdateUserInfoValues = z.infer<typeof updateUserInfoSchema>
