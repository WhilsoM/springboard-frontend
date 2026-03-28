import { useUserStore } from '@/entities/user'
import { Button, Input, Label } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { loginSchema, type LoginFormValues } from '../model'

export const LoginPage = () => {
  const navigate = useNavigate()
  const login = useUserStore((s) => s.loginUser)
  const userRole = useUserStore((s) => s.user?.role)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    await login(data)

    if (userRole === 'employer') {
      navigate('/dashboard/employer')
    } else {
      navigate('/dashboard/applicant')
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="relative hidden w-1/2 bg-slate-900 lg:block">
        <img
          src="https://images.unsplash.com/photo-1650094983020-89c3dfa9ce0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwd29ya3NwYWNlJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzc0MjY2Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern workspace"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent p-12">
          <div className="max-w-md">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
              IT-карьера с Трамплин.
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white px-8 lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="mb-2 text-2xl font-bold text-slate-900">С возвращением</h1>
            <p className="text-slate-500">Введите свои данные для входа.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label className="mb-1.5 block text-sm font-medium text-slate-700">Почта</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@university.edu"
                className={errors.email ? 'border-red-500 focus:ring-red-200' : ''}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm font-medium text-slate-700">Пароль</Label>
              </div>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className={errors.password ? 'border-red-500 focus:ring-red-200' : ''}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 py-6 text-base font-semibold transition-transform active:scale-[0.98]"
            >
              {isSubmitting ? 'Вход...' : 'Войти'} <ArrowRight className="h-5 w-5" />
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-600">
                Впервые у нас?{' '}
                <Link to="/auth/register" className="font-semibold text-blue-600 hover:underline">
                  Создать аккаунт
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
