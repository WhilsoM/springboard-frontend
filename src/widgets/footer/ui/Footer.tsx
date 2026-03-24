import { Github, Globe, GraduationCap, Instagram, Linkedin } from 'lucide-react'
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
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  For Students
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  For Employers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
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
            <div className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer hover:text-white transition-colors ml-4 md:ml-0">
              <Globe className="h-4 w-4" />
              <span>Русский (РУ)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
