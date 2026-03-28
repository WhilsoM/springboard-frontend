import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { tagsApi } from '../api'
import type { TTagsStore } from './types'

export const useTagsStore = create<TTagsStore>()(
  persist(
    (set, get): TTagsStore => ({
      tags: [],
      filterTags: [],
      fetchTags: async () => {
        const { tags } = get()
        if (tags.length > 0) return

        try {
          const response = await tagsApi.getTags()
          console.log(response)

          set({ tags: response.data })
        } catch (error) {
          console.error('Failed to fetch tags:', error)
        }
      },
      addToFilterTags: (tag: string) => {
        const { filterTags } = get()
        if (!filterTags.includes(tag)) {
          set({ filterTags: [...filterTags, tag] })
          return
        }
        set({ filterTags: filterTags.filter((name) => name !== tag) })
      },
      createNewTag: async (name: string) => {
        try {
          const response = await tagsApi.createNewTag(name)
          set((state) => ({ tags: [...state.tags, response.data] }))
        } catch (error) {
          console.error('Failed to create new tag:', error)
        }
      },
    }),
    { name: 'tags-store' },
  ),
)
