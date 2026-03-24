import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-2 text-blue-600">
        <GraduationCap className="h-6 w-6" />
        <span className="text-xl font-bold tracking-tight">Трамплин</span>
      </div>

      <div className="flex items-center gap-4">
        <Link to={'/auth'}>Log In</Link>
        <Link to={'/auth'}>Register</Link>
      </div>
    </header>
  )
}
