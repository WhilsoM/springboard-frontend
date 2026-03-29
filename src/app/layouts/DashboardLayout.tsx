import { useUserStore } from '@/entities/user'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  const user = useUserStore((s) => s.user)
  const getUserMe = useUserStore((s) => s.getUserMe)
  const isLoading = useUserStore((s) => s.isLoading)
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    if (accessToken && !user && !isLoading) {
      getUserMe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, !!user, getUserMe, isLoading])

  return <Outlet />
}
