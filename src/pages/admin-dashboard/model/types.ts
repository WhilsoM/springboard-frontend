import type { Dispatch, JSX, SetStateAction } from 'react'

export type TTab = 'verifications' | 'moderation' | 'users' | 'tags' | 'admins'

export interface IAdminSidebarProps {
  activeTab: TTab
  setActiveTab: Dispatch<SetStateAction<TTab>>
}

export interface IAdminSidebarTabs {
  tab: TTab
  text: string
  icon: JSX.Element
}
