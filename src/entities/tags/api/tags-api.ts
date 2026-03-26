import { apiInstance } from '@/shared'
import type { ITag } from '../model'

export const tagsApi = {
  getTags: () => apiInstance.get<ITag[]>('/tags'),
  createNewTag: (name: string) => apiInstance.post<ITag>('/tags', { name }),
}
