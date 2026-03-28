import { useOpportunityStore } from '@/entities/opportunity'
import { useEffect } from 'react'
import { OpportunityCard } from './OpportunityCard'

export const EmployerOpportunityList = () => {
  const getOpportunitiesByEmployer = useOpportunityStore((s) => s.getOpportunitiesByEmployer)
  const opportunitiesEmployer = useOpportunityStore((s) => s.opportunitiesEmployer)
  const isLoading = useOpportunityStore((s) => s.isLoading)

  useEffect(() => {
    getOpportunitiesByEmployer()
  }, [getOpportunitiesByEmployer])

  return (
    <div className="p-4 space-y-4">
      {isLoading && <div>Загрузка...</div>}
      {!opportunitiesEmployer.length && (
        <div className="flex justify-center items-center mb-5">У вас нету открытых вакансий!</div>
      )}
      {!isLoading &&
        opportunitiesEmployer?.map((t) => (
          <OpportunityCard
            key={t.id}
            id={t.id}
            title={t.title}
            status={t.is_active}
            posted={t.created_at}
          />
        ))}
    </div>
  )
}
