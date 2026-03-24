import { create } from 'zustand'
import { opportunityApi } from '../api'
import type { TOpportunityStore } from './types'

export const useOpportunityStore = create<TOpportunityStore>((set) => ({
  opportunities: [],

  fetchOpportunities: async (params) => {
    try {
      const response = await opportunityApi.getOpportunities(params)
      set({ opportunities: response.data.opportunities })
    } catch (error) {
      console.error('Failed to fetch opportunities:', error)
    }
  },
}))
