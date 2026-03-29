import { Analytics } from '@vercel/analytics/next'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from '../routes'
import '../styles/index.css'
const root = document.getElementById('root')

createRoot(root!).render(
  <StrictMode>
    <Analytics />
    <RouterProvider router={router} />
  </StrictMode>,
)
