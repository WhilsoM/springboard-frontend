import { apiInstance } from '@/shared'
import type { ITag } from '../model'

export const tagsApi = {
  getTags: () => apiInstance.get<ITag[]>('/tags'),
}
