import { Button, cn } from '@/shared'
import { useTagsStore } from '../model'

export const TagList = ({ canChoose = false }: { canChoose?: boolean }) => {
  const tags = useTagsStore((state) => state.tags)
  const filterTags = useTagsStore((state) => state.filterTags)
  const addToFilterTags = useTagsStore((state) => state.addToFilterTags)

  const isSelected = (tagName: string) => filterTags.includes(tagName)

  return (
    <div className="flex items-center flex-wrap gap-2">
      {tags.map((tag) => {
        const active = isSelected(tag.name)

        return canChoose ? (
          <Button
            key={tag.id}
            variant={active ? 'default' : 'outline'}
            className={cn(
              'rounded-full px-4 py-1 transition-all duration-200',
              active
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400',
            )}
            onClick={() => addToFilterTags(tag.name)}
          >
            {tag.name}
          </Button>
        ) : (
          <span
            key={tag.id}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm border border-slate-200"
          >
            {tag.name}
          </span>
        )
      })}
    </div>
  )
}
