export interface ITag {
  id: string
  name: string
}

export type TTagsStore = {
  tags: ITag[]
  filterTags: string[]
  fetchTags: () => Promise<void>
  addToFilterTags: (tag: string) => void
  createNewTag: (name: string) => Promise<void>
}
