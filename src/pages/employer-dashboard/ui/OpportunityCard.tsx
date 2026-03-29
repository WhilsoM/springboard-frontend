import { useOpportunityStore } from '@/entities/opportunity'
import { Button, formatRelativeDate } from '@/shared'
import { Briefcase, Edit, XCircle } from 'lucide-react'
import { Link } from 'react-router'
import type { OpportunityCardProps } from '../model'

export const OpportunityCard = ({ id, title, status, posted }: OpportunityCardProps) => {
  const deleteOpportunity = useOpportunityStore((s) => s.deleteOpportunityById)

  return (
    <div className="group flex flex-col gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between transition-all hover:shadow-md border border-transparent hover:border-blue-100 rounded-xl">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Briefcase className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
          <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
            <p className={status ? 'text-green-500' : 'text-slate-500'}>{status}</p>
            <span>Опубликовано {formatRelativeDate(posted)}</span>
          </div>
        </div>
      </div>

      <Link
        to={`/dashboard/employer/opportunities/${id}/applications`}
        className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
      >
        Смотреть отклики
      </Link>

      <div className="flex items-center gap-2">
        <Link
          to={`edit/${id}`}
          className="rounded-full border-2 border-gray-300 p-2 hover:bg-gray-50 transition-colors"
          aria-label="edit opportunity"
          title="edit opportunity"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-red-50 hover:text-red-600"
          aria-label="delete opportunity"
          title="delete opportunity"
          onClick={() => deleteOpportunity(id)}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
