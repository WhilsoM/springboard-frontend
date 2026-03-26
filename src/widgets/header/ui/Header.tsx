import { useUserStore } from '@/entities/user'
import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router'

export const Header = () => {
  const userRole = useUserStore((state) => state.user?.role)
  const haveTokens =
    !!localStorage.getItem('access_token') || !!localStorage.getItem('refresh_token')

  // TODO: add curator role check
  const url = userRole === 'applicant' ? '/dashboard/applicant' : '/dashboard/employer'

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-2 text-blue-600">
        <GraduationCap className="h-6 w-6" />
        <span className="text-xl font-bold tracking-tight">Трамплин</span>
      </div>

      <div className="flex items-center gap-4">
        {haveTokens ? (
          <Link
            to={url}
            className="bg-blue-200 hover:bg-transparent hover:border-blue-200 text-blue-700 py-2 px-4 rounded-md transition-colors duration-200"
          >
            Панель профиля
          </Link>
        ) : (
          <>
            <Link
              className="bg-blue-200 hover:bg-transparent hover:border-blue-200 text-blue-700 py-2 px-4 rounded-md transition-colors duration-200"
              to={'/auth/register'}
            >
              Зарегистрироваться
            </Link>
            <Link
              className="border-2 border-blue-200 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-md transition-colors duration-200"
              to={'/auth/login'}
            >
              Войти
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
