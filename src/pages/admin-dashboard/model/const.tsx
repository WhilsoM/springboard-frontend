import { FileText, ShieldCheck, Tag, Users, UserStar } from 'lucide-react'
import type { IAdminSidebarTabs } from './types'

export const SIDEBAR_TABS: IAdminSidebarTabs[] = [
  {
    tab: 'verifications',
    text: 'Verifications',
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    tab: 'moderation',
    text: 'Content Moderation',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    tab: 'users',
    text: 'Users & Roles',
    icon: <Users className="h-5 w-5" />,
  },
  {
    tab: 'admins',
    text: 'Admins',
    icon: <UserStar className="h-5 w-5" />,
  },
  {
    tab: 'tags',
    text: 'Tags Management',
    icon: <Tag className="h-5 w-5" />,
  },
]
