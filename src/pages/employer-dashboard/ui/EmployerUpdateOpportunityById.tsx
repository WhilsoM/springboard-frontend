import { useOpportunityStore } from '@/entities/opportunity'
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ArrowLeft, Banknote, Calendar as CalendarIcon, MapPin, Save, X } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { updateOpportunitySchema, type UpdateOpportunityValues } from '../model'
import { LocationPicker } from './LocationPicker'

export const EmployerUpdateOpportunityById = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const getOpportunityById = useOpportunityStore((s) => s.getOpportunityById)
  const updateOpportunityById = useOpportunityStore((s) => s.updateOpportunityById)

  const isLoading = useOpportunityStore((s) => s.isLoading)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateOpportunityValues>({
    resolver: zodResolver(updateOpportunitySchema) as never,
  })

  const setupOpportunity = useCallback(async () => {
    if (!id) {
      return
    }
    const res = await getOpportunityById(id)

    if (res) {
      reset({
        title: res.title,
        type: res.type,
        format: res.format,
        experience_level: res.experience_level,
        expires_at: res.expires_at,
        salary_max: res.salary_max,
        salary_min: res.salary_min,
        latitude: res.latitude,
        longitude: res.longitude,
        city: res.city,
        address: res.address,
        description: res.description,
        tags: res.tags,
      })
    }
  }, [getOpportunityById, id, reset])

  useEffect(() => {
    setupOpportunity()
  }, [setupOpportunity])

  const tags = watch('tags') || []

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((t) => t !== tagToRemove),
    )
  }

  const onSubmit = async (data: UpdateOpportunityValues) => {
    console.log(`Updating ${id}:`, data)
    if (!id) return
    await updateOpportunityById(id, data)
    navigate('/dashboard/employer')
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn('ФОРМА НЕ ВАЛИДНА! Ошибки в полях:', errors)
    }
  }, [errors])

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        Некорректный id вакансии!
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-pulse font-black text-slate-400 tracking-widest">
          ЗАГРУЗКА ДАННЫХ...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <Button
                variant={'ghost'}
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold tracking-widest"
              >
                <ArrowLeft size={16} /> НАЗАД
              </Button>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Редактирование</h1>
            </div>
            <Button
              disabled={isSubmitting}
              className="h-14 px-10 rounded-2xl bg-blue-600 shadow-xl shadow-blue-100 font-bold gap-2 hover:bg-blue-700 transition-all active:scale-95"
              type="submit"
            >
              <Save size={20} /> {isSubmitting ? 'Сохранение...' : 'Обновить вакансию'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Название
                  </Label>
                  <Input
                    {...register('title')}
                    placeholder="Напр. Senior Go Developer"
                    className={`h-14 rounded-2xl border-none transition-all ${
                      errors.title
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs font-bold pl-2">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Описание
                  </Label>
                  <textarea
                    {...register('description')}
                    rows={6}
                    className={`w-full rounded-[2rem] p-6 focus:ring-2 outline-none resize-none transition-all ${
                      errors.description
                        ? 'bg-red-50 ring-2 ring-red-500'
                        : 'bg-slate-50/50 border-none focus:ring-blue-500 focus:bg-white'
                    }`}
                    placeholder="Подробно опишите требования и стек..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs font-bold pl-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Стек
                  </Label>
                  <div className="flex flex-wrap gap-2 p-4 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="pl-3 pr-1 py-1 bg-blue-50 text-blue-700 rounded-xl flex items-center gap-1 font-bold text-sm border border-blue-100"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-blue-200 rounded-md p-0.5 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      placeholder="Добавить (Enter)..."
                      className="flex-1 min-w-30 bg-transparent outline-none text-sm font-medium"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const val = e.currentTarget.value.trim()
                          if (val && !tags.includes(val)) {
                            setValue('tags', [...tags, val])
                            e.currentTarget.value = ''
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 font-bold text-slate-900">
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-xl">Локация</h3>
                </div>

                <div className="grid items-stretch grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      {...register('city')}
                      placeholder="Город"
                      className="h-14 rounded-2xl bg-slate-50/50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs pl-2">{errors.city.message}</p>
                    )}
                  </div>
                  <Controller
                    name="format"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50/50 border-none focus:ring-2 focus:ring-blue-500 font-medium">
                          <SelectValue placeholder="Формат работы" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                          <SelectItem value="remote" className="rounded-lg">
                            Удаленно
                          </SelectItem>
                          <SelectItem value="office" className="rounded-lg">
                            Офис
                          </SelectItem>
                          <SelectItem value="hybrid" className="rounded-lg">
                            Гибрид
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {watch('format') !== 'remote' && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Точный адрес на карте
                      </Label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {watch('latitude')?.toFixed(4)}, {watch('longitude')?.toFixed(4)}
                      </span>
                    </div>

                    <LocationPicker
                      latitude={watch('latitude')}
                      longitude={watch('longitude')}
                      onChange={(lat, lng) => {
                        setValue('latitude', lat, { shouldValidate: true })
                        setValue('longitude', lng, { shouldValidate: true })
                      }}
                    />

                    <Input
                      {...register('address')}
                      placeholder="Улица, дом, офис..."
                      className="h-12 rounded-xl bg-slate-50/50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl space-y-6">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Banknote size={20} /> Условия
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 tracking-widest">
                      ОТ
                    </span>
                    <Input
                      {...register('salary_min')}
                      type="number"
                      className="bg-white/5 border-white/10 focus:border-blue-500 rounded-xl text-white h-12"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-500 tracking-widest">
                      ДО
                    </span>
                    <Input
                      {...register('salary_max')}
                      type="number"
                      className="bg-white/5 border-white/10 focus:border-blue-500 rounded-xl text-white h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-500 tracking-widest">
                    УРОВЕНЬ ОПЫТА
                  </span>
                  <Controller
                    name="experience_level"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-white/5 border-white/10 focus:border-blue-500 rounded-xl h-12 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="lead">Lead</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-2 font-bold">
                  <CalendarIcon size={20} /> Дедлайн
                </div>
                <Controller
                  name="expires_at"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-xl h-12 font-medium"
                        >
                          {field.value
                            ? format(new Date(field.value), 'PPP', { locale: ru })
                            : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 rounded-2xl border-none shadow-2xl"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          locale={ru}
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date?.toISOString())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <p className="text-[10px] text-blue-100 font-bold uppercase tracking-tighter opacity-70 mt-3">
                  После этой даты вакансия перестанет отображаться в поиске
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
