import { useUserStore } from '@/entities/user'
import { Button, cn } from '@/shared'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { SIDEBAR_TABS, type IAdminSidebarProps } from '../model'

export const AdminSidebar = ({ activeTab, setActiveTab }: IAdminSidebarProps) => {
  const navigate = useNavigate()
  const logout = useUserStore((s) => s.logout)

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6 mb-3">
        <Link to={'/'}>
          <ArrowLeft className="mr-2 h-6 w-6 text-slate-600 hover:text-slate-900" />
        </Link>
        <ShieldCheck className="mr-2 h-6 w-6 text-blue-600" />
        <span className="text-lg font-bold text-slate-900">Curator Panel</span>
      </div>

      <nav className="flex flex-col gap-2.5">
        {SIDEBAR_TABS.map((tab) => (
          <Button
            onClick={() => setActiveTab(tab.tab)}
            key={tab.tab}
            variant={'ghost'}
            className={cn(
              'flex justify-start w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeTab === tab.tab
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            {tab.icon}
            {tab.text}
          </Button>
        ))}

        <Button
          variant="default"
          className="text-white w-full  rounded-xl font-bold bg-red-500  hover:bg-red-600 mt-5!"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          Выйти из аккаунта
        </Button>
      </nav>
    </aside>
  )
}
