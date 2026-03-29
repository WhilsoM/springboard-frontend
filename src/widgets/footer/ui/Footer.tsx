import { Github, GraduationCap } from 'lucide-react'
import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-8 mb-16">
          <div className="flex flex-col lg:col-span-2 space-y-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-white transition-opacity hover:opacity-90"
            >
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold tracking-tight">Трамплин</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Современная платформа, объединяющая амбициозных студентов с ведущими технологическими
              компаниями России. Начните свою карьеру в сфере ИТ уже сегодня.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="https://github.com/WhilsoM/springboard-frontend"
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 Трамплин. Все права защищены.</p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors">
              Правила сервиса
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
