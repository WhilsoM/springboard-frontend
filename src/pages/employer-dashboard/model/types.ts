import type { Dispatch, SetStateAction } from 'react'

export interface OpportunityCardProps {
  title: string
  status: string
  applications: number
  posted: string
}

export interface IEmployerUpdateAvatarProps {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}
