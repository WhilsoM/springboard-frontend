export interface IOpportunity {
  id: string
  employer_id: string
  company_name: string
  title: string
  description: string
  location: string
  city: string
  address: string
  latitude: string
  longitude: string
  tags: string[]
  salary_min: number
  salary_max: number
  experience_level: string
  is_active: boolean
  type: string
  format: string
  expires_at: string
  created_at: string
}
