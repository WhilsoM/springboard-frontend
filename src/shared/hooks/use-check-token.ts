import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useCheckToken = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')) {
      return
    }
    navigate('/')
  }, [navigate])
}
