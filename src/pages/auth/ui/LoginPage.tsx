import { Button, Input } from '@/shared'
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const LoginPage = () => {
  const [role, setRole] = useState<'applicant' | 'employer'>('applicant')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: send quest to backend
    if (role === 'employer') {
      navigate('/employer-dashboard')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex h-[98vh] overflow-x-hidden  bg-white">
      <div className="relative hidden w-1/2 overflow-hidden  bg-slate-900 lg:block">
        <img
          src="https://images.unsplash.com/photo-1650094983020-89c3dfa9ce0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwd29ya3NwYWNlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc0MjY2Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern workspace"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent p-12">
          <div className="max-w-md">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
              Запустите свою IT-карьеру с Трамплин.
            </h2>
            <p className="text-lg leading-relaxed text-slate-300">
              Присоединяйтесь к тысячам студентов и ведущим техно-компаниям, создающим будущее
              российского IT-сектора.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white px-8 lg:w-1/2 lg:px-23 xl:px-32">
        <div className="mx-auto max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Добро пожаловать в Трамплин</h1>
            <p className="text-slate-500">Войдите или создайте аккаунт, чтобы продолжить.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">ФИО</label>
                <Input placeholder="Иван Иванов" required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Электронная почта
                </label>
                <Input type="email" placeholder="name@university.edu" required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Пароль</label>
                <Input type="password" placeholder="••••••••" required />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Я — ...</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                      role === 'applicant'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="applicant"
                      checked={role === 'applicant'}
                      onChange={() => setRole('applicant')}
                      className="sr-only"
                    />
                    Соискатель
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                      role === 'employer'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={role === 'employer'}
                      onChange={() => setRole('employer')}
                      className="sr-only"
                    />
                    Работодатель
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 py-6 text-base font-semibold">
              Продолжить <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-center text-xs text-slate-500 leading-relaxed">
              Нажимая «Продолжить», вы соглашаетесь с нашими{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Условиями обслуживания
              </Link>{' '}
              и{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
