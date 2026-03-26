import { Button } from '@/shared'
import { Check, Share2, X } from 'lucide-react'

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
export const ApplicantNetworking = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                <img src={contact.avatar} alt={contact.name} className="h-8 w-8 rounded-full" />
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
  )
}
