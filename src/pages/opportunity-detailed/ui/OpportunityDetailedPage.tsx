import { useOpportunityStore, type IOpportunity } from '@/entities/opportunity'
import { AddToFavorite } from '@/features/favorites'
import { Button } from '@/shared'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ArrowLeft, Banknote, Briefcase, Building2, Calendar, Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const formatMap: Record<string, string> = {
  remote: 'Удаленно',
  office: 'В офисе',
  hybrid: 'Гибрид',
}
const expMap: Record<string, string> = {
  junior: 'Junior',
  middle: 'Middle',
  senior: 'Senior',
  lead: 'Lead',
}

export const OpportunityDetailedPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const getOpportunityById = useOpportunityStore((s) => s.getOpportunityById)

  const [opportunity, setOpportunity] = useState<IOpportunity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOpp = async () => {
      if (!id) return
      setIsLoading(true)
      const data = await getOpportunityById(id)
      if (data) {
        setOpportunity(data)
      }
      setIsLoading(false)
    }
    fetchOpp()
  }, [id, getOpportunityById])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-pulse font-black text-slate-400 tracking-widest">
          ЗАГРУЗКА ВАКАНСИИ...
        </div>
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] gap-4">
        <h1 className="text-2xl font-black text-slate-900">Вакансия не найдена</h1>
        <Button onClick={() => navigate(-1)} variant="outline" className="rounded-xl">
          Вернуться назад
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors p-0 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Назад
        </Button>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Briefcase size={200} />
          </div>

          <div className="space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <Building2 size={20} />
                  <span>{opportunity.company_name}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  {opportunity.title}
                </h1>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 font-bold rounded-xl text-sm">
                    {expMap[opportunity.experience_level] || opportunity.experience_level}
                  </span>
                  <span className="px-4 py-2 bg-slate-50 text-slate-700 font-bold rounded-xl text-sm">
                    {formatMap[opportunity.format] || opportunity.format}
                  </span>
                  <span className="px-4 py-2 bg-slate-50 text-slate-700 font-bold rounded-xl text-sm">
                    {opportunity.type === 'vacancy' ? 'Вакансия' : 'Стажировка'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-2 shrink-0">
                <AddToFavorite opportunity={opportunity} />
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl">
              <div className="p-3 bg-white/10 rounded-2xl text-blue-400">
                <Banknote size={28} />
              </div>
              <div>
                <div className="text-[10px] font-black tracking-widest text-slate-400 mb-1">
                  УРОВЕНЬ ДОХОДА
                </div>
                <div className="text-2xl font-black tracking-tight">
                  {opportunity.salary_min.toLocaleString()} —{' '}
                  {opportunity.salary_max.toLocaleString()} ₽
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-100">
              <div className="md:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Описание</h2>
                  <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {opportunity.description}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Стек технологий</h2>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="pl-3 pr-3 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-3xl p-6 space-y-6 border border-slate-100">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      <MapPin size={14} /> Локация
                    </div>
                    <div className="font-bold text-slate-900">{opportunity.city}</div>
                    <div className="text-sm text-slate-500 font-medium">{opportunity.address}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      <Calendar size={14} /> Опубликовано
                    </div>
                    <div className="font-bold text-slate-900">
                      {format(new Date(opportunity.created_at), 'd MMMM yyyy', { locale: ru })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest uppercase">
                      <Clock size={14} /> Актуально до
                    </div>
                    <div className="font-bold text-red-500">
                      {format(new Date(opportunity.expires_at), 'd MMMM yyyy', { locale: ru })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
