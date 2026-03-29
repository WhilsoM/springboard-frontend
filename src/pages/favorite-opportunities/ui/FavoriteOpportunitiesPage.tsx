import { useOpportunityStore } from '@/entities/opportunity'
import { AddToFavorite } from '@/features/favorites'
import { Button } from '@/shared'
import { ArrowLeft, Briefcase, HeartOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router'

export const FavoriteOpportunitiesPage = () => {
  const navigate = useNavigate()
  const favorites = useOpportunityStore((s) => s.favoriteOpportunities)

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors p-0 font-bold text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Назад
            </Button>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Избранные <span className="text-blue-600">вакансии</span>
            </h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 font-bold text-slate-500">
            Всего: {favorites?.length}
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((op) => (
              <div
                key={op.id}
                className="group bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Briefcase size={24} />
                  </div>

                  <AddToFavorite opportunity={op} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{op.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {op.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-slate-100 flex items-center justify-between">
                  <div className="text-sm font-bold text-slate-900">
                    {op.salary_min ? `${op.salary_min.toLocaleString()} ₽` : 'З/П не указана'}
                  </div>
                  <Link to={`/opportunity/${op.id}`} className="text-blue-600 font-bold p-0 h-auto">
                    Подробнее →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <div className="p-6 bg-slate-50 rounded-full mb-4 text-slate-300">
              <HeartOff size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Тут пока пусто</h2>
            <p className="text-slate-400 font-medium mt-2 mb-6">
              Вы еще не добавили ни одной вакансии в избранное
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
