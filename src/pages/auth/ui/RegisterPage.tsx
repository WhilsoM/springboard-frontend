import { useUserStore, type IRegisterRequest } from '@/entities/user'
import { Button, Input } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { registerSchema, type RegisterFormValues } from '../model'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const createNewUser = useUserStore((state) => state.createNewUser)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      role: 'applicant',
    },
  })

  const selectedRole = watch('role')

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const requestData: IRegisterRequest = {
        email: data.email,
        password: data.password,
        role: data.role,
        display_name: data.displayName,
      }
      console.log(requestData)

      await createNewUser(requestData)
      if (data.role === 'employer') {
        navigate('/dashboard/employer')
      } else {
        navigate('/dashboard/applicant')
      }
    } catch (error) {
      console.error('Registration failed', error)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="relative hidden w-1/2 bg-slate-900 lg:block">
        <img
          src="https://images.unsplash.com/photo-1650094983020-89c3dfa9ce0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Modern workspace"
          fetchPriority="high"
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

      <div className="flex flex-col justify-center bg-white px-8 lg:w-1/2 lg:px-24 xl:px-32">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="mb-2 text-2xl font-bold text-slate-900">Создать аккаунт</h1>
            <p className="text-slate-500">Заполните данные, чтобы присоединиться к платформе.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Отображаемое имя
                </label>
                <Input
                  {...register('displayName')}
                  placeholder="Иванов Иван"
                  className={errors.displayName ? 'border-red-500' : ''}
                />
                {errors.displayName && (
                  <p className="mt-1 text-xs text-red-500">{errors.displayName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Почта</label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="name@university.edu"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Пароль</label>
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Я — ...</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                      selectedRole === 'applicant'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      {...register('role')}
                      type="radio"
                      value="applicant"
                      className="sr-only"
                    />
                    Соискатель
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 text-sm font-medium transition-all ${
                      selectedRole === 'employer'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <input
                      {...register('role')}
                      type="radio"
                      value="employer"
                      className="sr-only"
                    />
                    Работодатель
                  </label>
                </div>
                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2 py-6 text-base font-semibold"
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}{' '}
              <ArrowRight className="h-5 w-5" />
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Уже есть аккаунт?{' '}
                <Link to="/auth/login" className="font-semibold text-blue-600 hover:underline">
                  Войти
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
