import { useEffect } from 'react'
import { useOpportunityStore } from '../model'
import { OpportunityItem } from './OpportunityItem'

export const OpportunityList = () => {
  const opportunities = useOpportunityStore((state) => state.opportunities)
  const getAllOpportunities = useOpportunityStore((state) => state.getAllOpportunities)

  useEffect(() => {
    getAllOpportunities()
  }, [getAllOpportunities])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {opportunities.map((job) => (
        <OpportunityItem key={job.id} job={job} />
      ))}
    </div>
  )
}
