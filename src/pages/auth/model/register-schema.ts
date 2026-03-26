import { z } from 'zod'

export const authBase = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export const registerSchema = authBase.extend({
  role: z.enum(['applicant', 'employer']),
  displayName: z.string().min(2, 'Введите полное имя'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
