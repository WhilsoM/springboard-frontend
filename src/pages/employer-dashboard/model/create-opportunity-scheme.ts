import { z } from 'zod'
import { updateOpportunitySchema } from './update-opportunity-scheme'

export const createOpportunitySchema = updateOpportunitySchema

export type CreateOpportunityValues = z.infer<typeof createOpportunitySchema>
