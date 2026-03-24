import { Footer, Header } from '@/widgets'
import { Outlet } from 'react-router'

export const MainLayout = () => {
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
