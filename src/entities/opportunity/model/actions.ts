import { opportunityApi } from '../api'
import { useOpportunityStore } from './opportunity-store'
import type { IOpportunityCreateRequest, TOpportunityParams } from './types'

export const getAllOpportunitiesAction = async (params?: TOpportunityParams) => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    const response = await opportunityApi.getOpportunities(params)
    useOpportunityStore.setState({ opportunities: response.data.opportunities })
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}

export const getOpportunityByIdAction = async (id: string) => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    const response = await opportunityApi.getOpportunityById(id)
    return response.data
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}

export const getOpportunitiesByEmployerAction = async () => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    const response = await opportunityApi.getOpportunitiesByEmployer()
    console.log(response.data)

    useOpportunityStore.setState({ opportunitiesEmployer: response.data })
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}

export const createOpportunityAction = async (data: IOpportunityCreateRequest) => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    await opportunityApi.createOpportunity(data)
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}

export const deleteOpportunityByIdAction = async (id: string) => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    await opportunityApi.deleteOpportunityById(id)
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}

export const updateOpportunityByIdAction = async (id: string, data: IOpportunityCreateRequest) => {
  useOpportunityStore.setState({ isLoading: true })
  try {
    await opportunityApi.updateOpportunityById(id, data)
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
  } finally {
    useOpportunityStore.setState({ isLoading: false })
  }
}
