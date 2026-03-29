import { useUserStore } from '@/entities/user'
import { AddToFavorite } from '@/features/favorites'
import { Button } from '@/shared'
import { Building2, ChevronRight } from 'lucide-react'
import { memo, useState } from 'react'
import type { IOpportunity } from '../model'

export const OpportunityItem = memo(({ job }: { job: IOpportunity }) => {
  const apply = useUserStore((s) => s.apply)
  const [applied, setApplied] = useState(false)

  const handleApply = async () => {
    if (window.confirm(`Откликнуться на вакансию ${job.title}?`)) {
      const success = await apply(job.id)
      if (success) {
        setApplied(true)
        alert('Отклик успешно отправлен!')
      }
    }
  }
  return (
    <div
      key={job.id}
      className="group border-2 rounded-xl flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 border-slate-200"
    >
      <div className="p-6 flex-1">
        <div className="mt-5">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
              {job.title}
            </h3>
            <AddToFavorite opportunity={job} />
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-slate-600 text-sm font-medium">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span>{job.company_name}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <p key={tag} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm">
              {tag}
            </p>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {job.description}
        </p>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 p-5 mt-auto group-hover:bg-blue-50/50 transition-colors">
        <p className="font-bold text-slate-900 mb-4">
          {job.salary_min}&#8381; - {job.salary_max}&#8381;
        </p>
        <Button
          onClick={handleApply}
          disabled={applied}
          variant="ghost"
          className={applied ? 'text-green-600' : 'text-blue-600'}
        >
          {applied ? 'Вы откликнулись' : 'Откликнуться'} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
})
