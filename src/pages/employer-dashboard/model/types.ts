import type { Dispatch, SetStateAction } from 'react'

export interface OpportunityCardProps {
  id: string
  title: string
  status: boolean
  posted: string
}

export interface IEmployerUpdateAvatarProps {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}
