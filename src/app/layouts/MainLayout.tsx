import { useAuthInit } from '@/shared'
import { Footer, Header } from '@/widgets'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  useAuthInit()
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
