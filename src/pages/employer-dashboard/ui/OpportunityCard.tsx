import { Button } from '@/shared'
import { Briefcase, Edit, XCircle } from 'lucide-react'
import type { OpportunityCardProps } from '../model'

export const OpportunityCard = ({ title, status, applications, posted }: OpportunityCardProps) => (
  <div className="group flex flex-col gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between transition-all hover:shadow-md border border-transparent hover:border-blue-100 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Briefcase className="h-6 w-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
        <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
          <p className={status === 'Active' ? 'text-green-500' : 'text-slate-500'}>{status}</p>
          <span>Опубликовано {posted}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-6 border-t border-slate-50 pt-4 sm:border-0 sm:pt-0">
      <div className="flex flex-col items-end">
        <span className="text-3xl font-black text-slate-900 tracking-tighter">{applications}</span>
        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
          Откликов
        </span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full">
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-red-50 hover:text-red-600"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
)
