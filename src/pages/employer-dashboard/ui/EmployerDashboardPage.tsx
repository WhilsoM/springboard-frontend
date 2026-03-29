import { useOpportunityStore } from '@/entities/opportunity'
import { useUserStore, type IUserMeEmployerResponse } from '@/entities/user'
import { Button, Input, Label } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Building2, Globe, Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { companyProfileSchema, type CompanyProfileValues } from '../model'
import { EmployerOpportunityList } from './EmployerOpportunityList'
import { EmployerUpdateAvatar } from './EmployerUpdateAvatar'
import { EmployerVerificationWidget } from './EmployerVerificationWidget'

export const EmployerDashboardPage = () => {
  const navigate = useNavigate()
  const user = useUserStore((s) => s.user) as IUserMeEmployerResponse
  const logout = useUserStore((s) => s.logout)
  const deleteUserAccount = useUserStore((s) => s.deleteUserMe)
  const updateUserMe = useUserStore((s) => s.updateUserMe)
  const opportunitiesEmployer = useOpportunityStore((s) => s.opportunitiesEmployer)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  console.log('website url', user.website_url)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyProfileValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      company_name: user.company_name || '',
      website_url: user.website_url || '',
    },
  })

  const onSubmit = (data: Pick<IUserMeEmployerResponse, 'website_url' | 'company_name'>) => {
    const updatedData = {
      ...user,
      company_name: data.company_name,
      website_url: data.website_url,
    }

    updateUserMe(updatedData)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <Link to="/">
          <ArrowLeft />
        </Link>
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Рабочая область</h1>
            <p className="text-slate-500 font-medium text-lg">
              Управляйте профилем компании и вакансиями.
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link
              to={'create'}
              className="flex text-white items-center h-12 gap-2 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all font-bold"
            >
              <Plus className="h-5 w-5" /> Создать вакансию
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Building2 size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Профиль компании</h3>
              </div>

              <div className="group relative flex flex-col items-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl">
                  {user.avatar_url && (
                    <img src={user.avatar_url} alt="Logo" className="h-full w-full object-cover" />
                  )}

                  <Button
                    className="absolute inset-0 block w-full h-full cursor-pointer"
                    onClick={() => setIsDialogOpen(true)}
                    variant={'ghost'}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="text-white" size={24} />
                    </div>
                  </Button>
                  <EmployerUpdateAvatar
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Название
                    </Label>
                    <Input
                      disabled={!!user.company_name}
                      {...register('company_name')}
                      className="rounded-xl h-12 mb-2"
                      placeholder="Введите название компании"
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-sm">{errors.company_name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                      Сайт
                    </Label>
                    <div className="relative">
                      <Globe
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={16}
                      />
                      <Input
                        disabled={!!user.website_url}
                        {...register('website_url')}
                        className="pl-11 rounded-xl h-12 mb-2"
                        placeholder="example.com"
                      />
                    </div>
                    {errors.website_url && (
                      <p className="text-red-500 text-sm">{errors.website_url.message}</p>
                    )}
                  </div>

                  {(!user.company_name || !user.website_url) && (
                    <Button
                      variant="secondary"
                      className="w-full h-12 rounded-xl font-bold bg-slate-100 text-slate-900 hover:bg-slate-200"
                      type="submit"
                    >
                      Сохранить изменения
                    </Button>
                  )}
                </div>
              </form>
              <Button
                variant="default"
                className="text-white w-full h-12 rounded-xl font-bold bg-red-500  hover:bg-red-600 mt-5!"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Выйти из аккаунта
              </Button>

              <Button
                variant="default"
                className="text-white w-full h-12 rounded-xl font-bold bg-red-500  hover:bg-red-600"
                onClick={() => {
                  deleteUserAccount()
                  logout()
                  navigate('/')
                }}
              >
                Удалить аккаунт
              </Button>
            </div>

            <EmployerVerificationWidget />
          </aside>

          <main className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Управление вакансиями</h3>
                  <p className="text-slate-500 font-medium">Активные предложения</p>
                </div>
                <p className="bg-blue-50 text-blue-600 border-none font-bold p-2 rounded-sm">
                  Всего: {opportunitiesEmployer?.length}
                </p>
              </div>

              <EmployerOpportunityList />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
