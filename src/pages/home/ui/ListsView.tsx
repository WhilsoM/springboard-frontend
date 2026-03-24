import { OpportunityList } from '@/entities/opportunity'

export const ListsView = () => {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-2xl font-bold text-slate-900 ml-4 mb-4">Последние вакансии</h2>

      <OpportunityList />
    </div>
  )
}
