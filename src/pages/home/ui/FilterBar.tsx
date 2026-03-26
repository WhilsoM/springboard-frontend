import { TagList } from '@/entities/tags'
import { Checkbox } from '@/shared'

export const FilterBar = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 text-sm text-slate-700 pt-5 mt-5 border-t border-slate-100">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-900">Тип</span>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox defaultChecked id="type-job" />
          <span className="font-medium group-hover:text-blue-600 transition-colors">Работа</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox defaultChecked id="type-intern" />
          <span className="font-medium group-hover:text-blue-600 transition-colors">
            Стажировка
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox id="type-event" />
          <span className="font-medium group-hover:text-blue-600 transition-colors">Проект</span>
        </label>
      </div>

      <div className="hidden md:block h-6 w-px bg-slate-200" />

      <div className="flex items-center gap-4">
        <span className="font-semibold text-slate-900">Формат</span>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox defaultChecked id="format-office" />
          <span className="font-medium group-hover:text-blue-600 transition-colors">Офис</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <Checkbox defaultChecked id="format-remote" />
          <span className="font-medium group-hover:text-blue-600 transition-colors">Удаленка</span>
        </label>
      </div>

      <div className="hidden md:block h-6 w-px bg-slate-200" />

      <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <TagList canChoose />
      </div>
    </div>
  )
}
