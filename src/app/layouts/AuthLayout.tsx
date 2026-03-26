import { useLockBodyScroll } from '@/shared'
import { Outlet } from 'react-router'

export const AuthLayout = () => {
  useLockBodyScroll()

  return (
    <>
      <Outlet />
    </>
  )
}
