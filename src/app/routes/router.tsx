import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { AuthLayout, DashboardLayout, MainLayout } from '../layouts'
import { PrivateRoute } from '../layouts/PrivateRoute'
import { PublicRoute } from '../layouts/PublicRoute'

const EmployerDashboardPage = lazy(() =>
  import('@/pages/employer-dashboard/ui/EmployerDashboardPage').then((module) => ({
    default: module.EmployerDashboardPage,
  })),
)

const AdminDashboardPage = lazy(() =>
  import('@/pages/admin-dashboard/ui/AdminDashboardPage').then((module) => ({
    default: module.AdminDashboardPage,
  })),
)
const ApplicantDashboardPage = lazy(() =>
  import('@/pages/applicant-dashboard/ui/ApplicantDashboardPage').then((module) => ({
    default: module.ApplicantDashboardPage,
  })),
)

const HomePage = lazy(() =>
  import('@/pages/home/ui/HomePage').then((module) => ({ default: module.HomePage })),
)

const LoginPage = lazy(() =>
  import('@/pages/auth/ui/LoginPage').then((module) => ({ default: module.LoginPage })),
)

const RegisterPage = lazy(() =>
  import('@/pages/auth/ui/RegisterPage').then((module) => ({ default: module.RegisterPage })),
)

const EmployerUpdateOpportunityById = lazy(() =>
  import('@/pages/employer-dashboard/ui/EmployerUpdateOpportunityById').then((module) => ({
    default: module.EmployerUpdateOpportunityById,
  })),
)

const EmployerCreateOpportunity = lazy(() =>
  import('@/pages/employer-dashboard/ui/EmployerCreateOpportunity').then((module) => ({
    default: module.EmployerCreateOpportunity,
  })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'employer',
            children: [
              { index: true, element: <EmployerDashboardPage /> },
              {
                path: 'create',
                element: <EmployerCreateOpportunity />,
              },
              {
                path: 'edit/:id',
                element: <EmployerUpdateOpportunityById />,
              },
            ],
          },
          {
            path: 'applicant',
            element: <ApplicantDashboardPage />,
          },
          {
            path: 'admin',
            children: [],
            element: <AdminDashboardPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
])
