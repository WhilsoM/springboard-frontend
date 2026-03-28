import { useUserStore } from '@/entities/user'
import { Navigate, Outlet } from 'react-router'

interface Props {
  allowedRole: 'applicant' | 'employer' | 'curator'
}

export const RoleRoute = ({ allowedRole }: Props) => {
  const user = useUserStore((s) => s.user)
  const isLoading = useUserStore((s) => s.isLoading)

  if (isLoading) return <div>Загрузка...</div>

  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
