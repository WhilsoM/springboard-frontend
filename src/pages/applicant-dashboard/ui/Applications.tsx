import { Button } from '@/shared'
import { Briefcase } from 'lucide-react'
const APPLICATIONS = [
  {
    id: 1,
    title: 'Junior Frontend Developer',
    company: 'Tinkoff',
    status: 'Interviewing',
    date: 'Oct 24',
  },
  { id: 2, title: 'React Intern', company: 'VK', status: 'Received', date: 'Oct 28' },
  { id: 3, title: 'QA Engineer', company: 'Ozon', status: 'Rejected', date: 'Sep 15' },
]

export const Applications = () => {
  return (
    <div>
      <div className="border-b border-slate-200 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Applications</h3>
          <p className="text-sm text-slate-500 mt-1">Track your job and internship status.</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="divide-y divide-slate-100 p-2">
        {APPLICATIONS.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-slate-100 p-2 rounded-md text-slate-600">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{app.title}</h4>
                <p className="text-sm text-slate-500">
                  {app.company} • Applied {app.date}
                </p>
              </div>
            </div>
            <div>
              {app.status === 'Interviewing' && <span>{app.status}</span>}
              {app.status === 'Received' && <span>{app.status}</span>}
              {app.status === 'Rejected' && <span>{app.status}</span>}
              {app.status === 'Offer' && <span>{app.status}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
