import { z } from 'zod'
import { authBase } from './register-schema'

export const loginSchema = authBase

export type LoginFormValues = z.infer<typeof loginSchema>
