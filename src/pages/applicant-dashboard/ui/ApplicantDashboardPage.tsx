import { Button, cn, Input } from '@/shared'
import {
  Badge,
  Briefcase,
  Camera,
  Check,
  GraduationCap,
  MapPin,
  Share2,
  ShieldAlert,
  X,
} from 'lucide-react'
import { useState } from 'react'

const CONNECTIONS = [
  {
    id: 1,
    name: 'Elena Smirnova',
    role: 'HR Manager',
    company: 'Yandex',
    status: 'pending',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: 2,
    name: 'Alexey Popov',
    role: 'Senior Dev',
    company: 'SberTech',
    status: 'connected',
    avatar: 'https://i.pravatar.cc/150?u=5',
  },
]

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

export const ApplicantDashboardPage = () => {
  const [isPublic, setIsPublic] = useState(true)
  const [showResume, setShowResume] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h2>My Dashboard</h2>
          <p>Manage your profile, network, and applications.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Profile & Privacy */}
          <div className="space-y-6 lg:col-span-4">
            {/* Profile div */}
            <div className="p-6">
              <div className="mb-6 flex flex-col items-center">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?u=7"
                    className="h-28 w-28 border-4 border-white shadow-sm"
                  />
                  <Button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Dmitry Sokolov</h3>
                <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <GraduationCap className="h-4 w-4" /> Moscow State University
                </p>
                <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                  <MapPin className="h-4 w-4" /> Moscow, Russia
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 text-sm font-medium text-slate-700">Skills</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge>React</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Node.js</Badge>
                    <Button className="inline-flex items-center rounded-full border border-dashed border-slate-300 px-2.5 py-0.5 text-xs font-semibold text-slate-500 hover:border-blue-400 hover:text-blue-600">
                      + Add
                    </Button>
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-slate-100">
                  <Input defaultValue="github.com/dsokolov" />
                  <Input defaultValue="dsokolov.dev" />
                </div>

                <Button className="w-full">Update Profile</Button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="overflow-hidden border-amber-200">
              <div className="bg-amber-50 p-4 border-b border-amber-100 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-amber-900">Privacy & Visibility</h3>
              </div>
              <div className="p-5 space-y-6">
                <label className="flex items-start justify-between cursor-pointer group">
                  <div className="pr-4">
                    <p className="text-sm font-medium text-slate-900">
                      Show profile in student search
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Other students can find and connect with you.
                    </p>
                  </div>
                  <div className="relative">
                    <Input
                      type="checkbox"
                      className="sr-only"
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                    />
                    <div
                      className={cn(
                        'block h-6 w-10 rounded-full transition-colors',
                        isPublic ? 'bg-blue-600' : 'bg-slate-300',
                      )}
                    />
                    <div
                      className={cn(
                        'absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform',
                        isPublic ? 'translate-x-4' : '',
                      )}
                    />
                  </div>
                </label>

                <label className="flex items-start justify-between cursor-pointer group border-t border-slate-100 pt-5">
                  <div className="pr-4">
                    <p className="text-sm font-medium text-slate-900">
                      Share resume with verified employers
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Allows companies to directly message you about opportunities.
                    </p>
                  </div>
                  <div className="relative">
                    <Input
                      type="checkbox"
                      className="sr-only"
                      checked={showResume}
                      onChange={() => setShowResume(!showResume)}
                    />
                    <div
                      className={cn(
                        'block h-6 w-10 rounded-full transition-colors',
                        showResume ? 'bg-blue-600' : 'bg-slate-300',
                      )}
                    />
                    <div
                      className={cn(
                        'absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform',
                        showResume ? 'translate-x-4' : '',
                      )}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Networking & Applications */}
          <div className="space-y-6 lg:col-span-8">
            {/* Applications */}
            <div>
              <div className="border-b border-slate-200 p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Applications</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Track your job and internship status.
                  </p>
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
                      {app.status === 'Interviewing' && <Badge>{app.status}</Badge>}
                      {app.status === 'Received' && <Badge>{app.status}</Badge>}
                      {app.status === 'Rejected' && <Badge>{app.status}</Badge>}
                      {app.status === 'Offer' && <Badge>{app.status}</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Networking */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Connection Requests */}
              <div className="flex flex-col h-full">
                <div className="border-b border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900">Connection Requests</h3>
                </div>
                <div className="flex-1 divide-y divide-slate-100 p-2">
                  {CONNECTIONS.filter((c) => c.status === 'pending').map((req) => (
                    <div key={req.id} className="flex flex-col gap-3 p-4 bg-slate-50/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={req.avatar} alt={req.name} className="h-8 w-8 rounded-full" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{req.name}</p>
                          <p className="text-xs text-slate-500">
                            {req.role} at {req.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full mt-2">
                        <Button size="sm" className="flex-1 gap-1 py-1 h-8">
                          <Check className="h-3.5 w-3.5" /> Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 py-1 h-8 text-slate-600 hover:text-rose-600 hover:border-rose-200"
                        >
                          <X className="h-3.5 w-3.5" /> Ignore
                        </Button>
                      </div>
                    </div>
                  ))}
                  {CONNECTIONS.filter((c) => c.status === 'pending').length === 0 && (
                    <div className="p-8 text-center text-slate-500 text-sm">No new requests.</div>
                  )}
                </div>
              </div>

              {/* Your Contacts */}
              <div className="flex flex-col h-full">
                <div className="border-b border-slate-200 p-5">
                  <h3 className="font-semibold text-slate-900 flex items-center justify-between">
                    Your Contacts{' '}
                    <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      124
                    </span>
                  </h3>
                </div>
                <div className="flex-1 divide-y divide-slate-100 p-2">
                  {CONNECTIONS.filter((c) => c.status === 'connected').map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                          <p className="text-xs text-slate-500">{contact.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 h-8 px-2"
                        title="Recommend Job"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-3 text-center">
                  <Button className="text-sm text-blue-600 font-medium hover:underline">
                    View all contacts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
