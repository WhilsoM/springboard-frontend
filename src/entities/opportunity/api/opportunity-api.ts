import { apiInstance } from '@/shared'
import type { IOpportunityResponse, TOpportunityParams } from '../model'

export const opportunityApi = {
  getOpportunities: (params: TOpportunityParams | undefined) =>
    apiInstance.get<IOpportunityResponse>('/opportunities', { params }),
}
