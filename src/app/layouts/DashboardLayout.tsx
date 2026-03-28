import { useUserStore } from '@/entities/user'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  const { user, getUserMe, isLoading } = useUserStore()
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    if (accessToken && !user) {
      getUserMe()
    }
  }, [accessToken, user, getUserMe])

  if (isLoading && !user) {
    return <div className="flex h-screen items-center justify-center">Загрузка...</div>
  }

  return (
    <>
      <Outlet />
    </>
  )
}
