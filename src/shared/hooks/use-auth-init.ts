import { useUserStore } from '@/entities/user'
import { useEffect } from 'react'

export const useAuthInit = () => {
  const { user, getUserMe } = useUserStore()
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    if (accessToken && !user) {
      getUserMe()
    }
  }, [accessToken, getUserMe, user])
}
