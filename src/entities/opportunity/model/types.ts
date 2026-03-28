export type TOpportunityStore = {
  opportunities: IOpportunity[]
  opportunitiesEmployer: IOpportunity[]
  favoriteOpportunities: IOpportunity[]
  isLoading: boolean
  getAllOpportunities: (params?: TOpportunityParams) => Promise<void>
  addToFavorite: (item: IOpportunity) => void
  deleteFromFavorite: (id: string) => void
  getOpportunitiesByEmployer: () => Promise<void>
  getOpportunityById: (id: string) => Promise<IOpportunity | undefined>
  createOpportunity: (data: IOpportunityCreateRequest) => Promise<void>
  deleteOpportunityById: (id: string) => Promise<void>
  updateOpportunityById: (id: string, data: IOpportunityCreateRequest) => Promise<void>
}

export type TOpportunityParams = {
  type?: string
  format?: string
  search?: string
  tags?: string[]
}

export interface IOpportunity {
  id: string
  employer_id: string
  company_name: string
  title: string
  description: string
  city: string
  address: string
  latitude: number
  longitude: number
  tags: string[]
  salary_min: number
  salary_max: number
  experience_level: 'junior' | 'middle' | 'senior' | 'lead'
  is_active: boolean
  type: 'vacancy' | 'internship'
  format: 'remote' | 'office'
  expires_at: string
  created_at: string
}

export interface IOpportunityResponse {
  opportunities: IOpportunity[]
}

export type IOpportunityCreateRequest = Omit<
  IOpportunity,
  'created_at' | 'id' | 'employer_id' | 'company_name' | 'is_active'
>

export type IOpportunityUpdateRequest = Omit<
  IOpportunity,
  'created_at' | 'id' | 'employer_id' | 'company_name' | 'is_active'
>
