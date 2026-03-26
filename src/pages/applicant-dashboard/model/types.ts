import type { Dispatch, SetStateAction } from 'react'

export interface IApplicantUpdateInfoProps {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export type IApplicantUpdateAvatarProps = IApplicantUpdateInfoProps

export interface IApplicantUpdateInfo {
  email: string
  password: string
  display_name: string
  is_private: boolean
  university: string
  course: number
  skills: string[]
  portfolio_url: string
  github_url: string
}
