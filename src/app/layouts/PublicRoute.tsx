import { Navigate, Outlet } from 'react-router'

export const PublicRoute = () => {
  const isAuth = !!localStorage.getItem('access_token')

  return !isAuth ? <Outlet /> : <Navigate to="/" replace />
}
