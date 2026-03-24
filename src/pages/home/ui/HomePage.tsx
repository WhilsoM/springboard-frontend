import { Button, cn, Input } from '@/shared'
import { ArrowRight } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Link } from 'react-router'
import { FilterBar } from './FilterBar'
import { ListsView } from './ListsView'

const MapView = lazy(() => import('./MapView').then((module) => ({ default: module.MapView })))

export const HomePage = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list')

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32 lg:pt-24 lg:pb-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1773236376078-c51cba503832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzQzMzQyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tech background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>С
              нами более 5000+ студентов
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Начните свою карьеру в сфере ИТ с&nbsp;
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                Трамплин
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Общайтесь с ведущими технологическими компаниями России. Найдите индивидуальные
              стажировки, должности младших специалистов и эксклюзивные технические мероприятия,
              предназначенные для студентов и недавних выпускников.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to={'/auth'}
                className="p-2 rounded-sm gap-2 bg-white text-black flex items-center hover:bg-slate-100 shadow-lg"
              >
                Создать профиль <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="flex items-center -space-x-3 ml-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    alt="User"
                  />
                ))}
                <div className="flex w-10 h-10 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-xs font-medium text-white">
                  +5k
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1638452033979-14fba9e17fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHN0dWR5aW5nJTIwY29kaW5nfGVufDF8fHx8MTc3NDM1MDIxNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Student coding"
              className="relative rounded-2xl border border-slate-700 shadow-2xl object-cover h-100 w-full"
            />
          </div>
        </div>
      </section>

      <section className="relative z-40 mx-auto w-full max-w-7xl px-6 -mt-16 mb-8">
        <div className="p-4 md:p-6 shadow-xl border-slate-200/60 bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 relative">
              <Input placeholder="Название компании, город..." className="h-12 text-lg shadow-sm" />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-slate-100/80 p-1 shadow-inner h-12 w-full lg:w-auto">
              <Button
                onClick={() => setViewMode('list')}
                variant={'ghost'}
                className={cn(
                  'flex-1 lg:w-32 h-full rounded-md text-sm font-semibold transition-all duration-200',
                  viewMode === 'list'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900',
                )}
              >
                Список
              </Button>
              <Button
                onClick={() => setViewMode('map')}
                variant={'ghost'}
                className={cn(
                  'flex-1 lg:w-32 h-full rounded-md text-sm font-semibold transition-all duration-200',
                  viewMode === 'map'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900',
                )}
              >
                Карта
              </Button>
            </div>
          </div>
          <FilterBar />
        </div>
      </section>

      <section className="relative flex-1 bg-slate-50 pb-20">
        {viewMode === 'map' ? (
          <Suspense fallback={<div className="h-150 bg-slate-100 animate-pulse" />}>
            <MapView />
          </Suspense>
        ) : (
          <ListsView />
        )}
      </section>
    </div>
  )
}
