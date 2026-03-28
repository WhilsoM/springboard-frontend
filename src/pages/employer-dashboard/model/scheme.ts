import { z } from 'zod'

export const companyVerificationSchema = z.object({
  inn: z
    .string()
    .min(10, 'ИНН должен быть 10 или 12 цифр')
    .max(12, 'ИНН должен быть 10 или 12 цифр'),
})

export const companyProfileSchema = z.object({
  company_name: z.string().min(2, 'Название слишком короткое'),
  website_url: z.string().url('Введите корректный URL'),
})

export type CompanyVerificationValues = z.infer<typeof companyVerificationSchema>
export type CompanyProfileValues = z.infer<typeof companyProfileSchema>
