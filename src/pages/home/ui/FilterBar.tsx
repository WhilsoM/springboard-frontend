import { TagList } from '@/entities/tags'
import { Checkbox, Label } from '@/shared'
import type { IFilterBarProps } from '../model'

export const FilterBar = ({ filters, onChange }: IFilterBarProps) => {
  const handleSingleChange = (category: 'type' | 'format', value: string) => {
    const newValue = filters[category] === value ? '' : value
    onChange({ [category]: newValue })
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 text-sm text-slate-700 pt-5 mt-5 border-t border-slate-100">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-900">Тип</span>
        <Label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={filters.type === 'vacancy'}
            onCheckedChange={() => handleSingleChange('type', 'vacancy')}
          />
          <span className="font-medium">Работа</span>
        </Label>
        <Label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={filters.type === 'internship'}
            onCheckedChange={() => handleSingleChange('type', 'internship')}
          />
          <span className="font-medium">Стажировка</span>
        </Label>
      </div>

      <div className="hidden md:block h-6 w-px bg-slate-200" />

      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-900">Формат</span>
        <Label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={filters.format === 'office'}
            onCheckedChange={() => handleSingleChange('format', 'office')}
          />
          <span className="font-medium">Офис</span>
        </Label>
        <Label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={filters.format === 'remote'}
            onCheckedChange={() => handleSingleChange('format', 'remote')}
          />
          <span className="font-medium">Удаленка</span>
        </Label>
      </div>

      <div className="hidden md:block h-6 w-px bg-slate-200" />

      <div className="flex-1 items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <TagList
          canChoose
          selectedTags={filters.tags || []}
          onTagClick={(tagName) => {
            const currentTags = filters.tags || []
            const isSelected = currentTags.includes(tagName)

            const newTags = isSelected
              ? currentTags.filter((t) => t !== tagName)
              : [...currentTags, tagName]

            onChange({ tags: newTags })
          }}
        />
      </div>
    </div>
  )
}
