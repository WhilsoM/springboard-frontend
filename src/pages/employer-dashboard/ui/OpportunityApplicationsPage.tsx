import { useUserStore } from '@/entities/user'
import { Button } from '@/shared'
import { CheckCircle2, ChevronLeft, Github, GraduationCap, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

export const OpportunityApplicationsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const applications = useUserStore((s) => s.applications)
  const isAppsLoading = useUserStore((s) => s.isAppsLoading)
  const getOppApplications = useUserStore((s) => s.getOppApplications)
  const updateStatus = useUserStore((s) => s.updateStatus)

  useEffect(() => {
    if (id) getOppApplications(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isAppsLoading && applications?.length === 0)
    return <div className="text-center py-12">Загрузка...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Отклики на вакансию</h1>
      </div>

      <div className="grid gap-4">
        {applications?.length === 0 || !applications ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">На эту вакансию пока никто не откликнулся</p>
          </div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          applications?.map((app: any) => (
            <div
              key={app.id}
              className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-hover hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <img
                  src={app.applicant.avatar_url || 'https://via.placeholder.com/150'}
                  alt={app.applicant.display_name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-100"
                />
                <div>
                  <h3 className="font-bold text-slate-900">{app.applicant.display_name}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" /> {app.applicant.university},{' '}
                      {app.applicant.course} курс
                    </span>
                    {app.applicant.github_url && (
                      <a
                        href={app.applicant.github_url}
                        target="_blank"
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </a>
                    )}
                  </div>
                  <div className="flex gap-1 mt-2">
                    {app.applicant.skills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-100 text-[10px] rounded text-slate-600 uppercase font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                {app.status === 'pending' ? (
                  <>
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50 gap-2"
                      onClick={() => updateStatus(app.id, 'accepted')}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Принять
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 gap-2"
                      onClick={() => updateStatus(app.id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4" /> Отклонить
                    </Button>
                  </>
                ) : (
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      app.status === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {app.status === 'accepted' ? 'Принят' : 'Отклонен'}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
