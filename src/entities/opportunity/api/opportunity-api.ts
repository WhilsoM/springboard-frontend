import { apiInstance } from '@/shared'
import type {
  IOpportunity,
  IOpportunityCreateRequest,
  IOpportunityResponse,
  IOpportunityUpdateRequest,
  TOpportunityParams,
} from '../model'

export const opportunityApi = {
  getOpportunities: (params: TOpportunityParams | undefined) =>
    apiInstance.get<IOpportunityResponse>('/opportunities', { params }),
  getOpportunitiesByEmployer: () => apiInstance.get<IOpportunity[]>('/employer/opportunities'),
  getOpportunityById: (id: string) => apiInstance.get<IOpportunity>(`/opportunities/${id}`),
  createOpportunity: (data: IOpportunityCreateRequest) => apiInstance.post('/opportunities', data),
  deleteOpportunityById: (id: string) => apiInstance.delete(`/opportunities/${id}`),
  updateOpportunityById: (id: string, newData: IOpportunityUpdateRequest) =>
    apiInstance.put(`/opportunities/${id}`, newData),
}
