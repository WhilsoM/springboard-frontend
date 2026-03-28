import { Button, cn } from '@/shared'
import { useEffect } from 'react'
import { useTagsStore } from '../model'

interface TagListProps {
  canChoose?: boolean
  selectedTags?: string[]
  onTagClick?: (tagName: string) => void
}

export const TagList = ({ canChoose = false, selectedTags, onTagClick }: TagListProps) => {
  const tags = useTagsStore((state) => state.tags)
  const fetchTags = useTagsStore((state) => state.fetchTags)

  const storeFilterTags = useTagsStore((state) => state.filterTags)
  const addToFilterTags = useTagsStore((state) => state.addToFilterTags)

  const isSelected = (tagName: string) => {
    if (selectedTags) return selectedTags.includes(tagName)
    return storeFilterTags.includes(tagName)
  }

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  return (
    <div className="flex items-center flex-wrap gap-2">
      {tags.map((tag) => {
        const active = isSelected(tag.name)

        return canChoose ? (
          <Button
            key={tag.id}
            variant={active ? 'default' : 'outline'}
            className={cn(
              'rounded-full px-4 py-1 transition-all duration-200 text-xs md:text-sm',
              active
                ? 'bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50',
            )}
            onClick={() => {
              if (onTagClick) {
                onTagClick(tag.name)
              } else {
                addToFilterTags(tag.name)
              }
            }}
          >
            {tag.name}
          </Button>
        ) : (
          <span
            key={tag.id}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs border border-slate-200"
          >
            {tag.name}
          </span>
        )
      })}
    </div>
  )
}
