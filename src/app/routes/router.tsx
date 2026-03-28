import { FindApplicantsPage } from '@/pages'
import { FavoriteOpportunitiesPage } from '@/pages/favorite-opportunities/ui/FavoriteOpportunitiesPage'
import { RoleRoute } from '@/shared'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { AuthLayout, DashboardLayout, MainLayout, PrivateRoute, PublicRoute } from '../layouts'

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

const OpportunityDetailedPage = lazy(() =>
  import('@/pages/opportunity-detailed/ui/OpportunityDetailedPage').then((module) => ({
    default: module.OpportunityDetailedPage,
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
      {
        path: 'favorite-opportunities',
        element: <FavoriteOpportunitiesPage />,
      },
      {
        path: 'opportunity/:id',
        element: <OpportunityDetailedPage />,
      },
      {
        path: 'applicants',
        element: <FindApplicantsPage />,
      },
      {
        path: 'applicants/:id',
        // todo: add applicant detailed page
        // element: <FindApplicantsPage />,
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
            element: <RoleRoute allowedRole="employer" />,
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
            ],
          },
          {
            element: <RoleRoute allowedRole="applicant" />,
            children: [{ path: 'applicant', element: <ApplicantDashboardPage /> }],
          },
          {
            element: <RoleRoute allowedRole="curator" />,
            children: [
              {
                path: 'admin',
                element: <AdminDashboardPage />,
              },
            ],
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
