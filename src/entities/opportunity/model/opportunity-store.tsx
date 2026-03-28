import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  createOpportunityAction,
  deleteOpportunityByIdAction,
  getAllOpportunitiesAction,
  getOpportunitiesByEmployerAction,
  getOpportunityByIdAction,
  updateOpportunityByIdAction,
} from './actions'
import type { IOpportunity, TOpportunityStore } from './types'

export const useOpportunityStore = create<TOpportunityStore>()(
  persist(
    (set) => ({
      opportunities: [],
      opportunitiesEmployer: [],
      favoriteOpportunities: [],
      isLoading: false,

      addToFavorite: (item: IOpportunity) =>
        set((state) => ({
          favoriteOpportunities: state.favoriteOpportunities.some((f) => f.id === item.id)
            ? state.favoriteOpportunities
            : [...state.favoriteOpportunities, item],
        })),

      deleteFromFavorite: (id: string) =>
        set((state) => ({
          favoriteOpportunities: state.favoriteOpportunities.filter((fav) => fav.id !== id),
        })),

      getAllOpportunities: getAllOpportunitiesAction,
      getOpportunitiesByEmployer: getOpportunitiesByEmployerAction,
      getOpportunityById: getOpportunityByIdAction,
      createOpportunity: createOpportunityAction,
      deleteOpportunityById: deleteOpportunityByIdAction,
      updateOpportunityById: updateOpportunityByIdAction,
    }),
    {
      name: 'opportunity-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favoriteOpportunities: state.favoriteOpportunities,
      }),
    },
  ),
)
