import {
  AdminDashboardPage,
  ApplicantDashboardPage,
  EmployerDashboardPage,
  HomePage,
} from '@/pages'
import { LoginPage } from '@/pages/auth/ui/LoginPage'
import { createBrowserRouter } from 'react-router'
import { AuthLayout, MainLayout } from '../layouts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'employer',
        element: <EmployerDashboardPage />,
      },
      {
        path: 'applicant',
        element: <ApplicantDashboardPage />,
      },
      {
        path: 'admin',
        element: <AdminDashboardPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    // TODO: Implement AdminLayout and add admin routes
    path: '/admin',
    // element: <AdminLayout />,
    children: [],
  },
])
