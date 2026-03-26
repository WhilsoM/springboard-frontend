import { Navigate, Outlet } from 'react-router'

export const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('access_token')

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" replace />
}
