import { useEffect } from 'react'
import { useOpportunityStore } from '../model'
import { OpportunityItem } from './OpportunityItem'

export const OpportunityList = () => {
  const opportunities = useOpportunityStore((state) => state.opportunities)
  const fetchOpportunities = useOpportunityStore((state) => state.fetchOpportunities)

  useEffect(() => {
    fetchOpportunities()
  }, [fetchOpportunities])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {opportunities.map((job) => (
        <OpportunityItem key={job.id} job={job} />
      ))}
    </div>
  )
}
