import { useUserStore, type IUserMeApplicantResponse } from '@/entities/user'
import { Button } from '@/shared'
import { Check, X } from 'lucide-react'
import { useEffect } from 'react'

interface IContactWithStatus extends IUserMeApplicantResponse {
  status?: 'pending' | 'accepted' | 'rejected'
}

export const ApplicantNetworking = () => {
  const contacts = useUserStore((s) => s.contacts) as IContactWithStatus[]
  const getContacts = useUserStore((s) => s.getContacts)
  const handleRequest = useUserStore((s) => s.handleRequest)

  useEffect(() => {
    getContacts()
  }, [getContacts])

  const pendingRequests = contacts.filter((c) => c.status === 'pending')
  const connectedContacts = contacts.filter((c) => c.status === 'accepted' || !c.status)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 p-5 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Запросы</h3>
        </div>
        <div className="flex-1 divide-y divide-slate-100 p-2 overflow-y-auto max-h-100">
          {pendingRequests.map((req) => (
            <div key={req.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-3">
                {req.avatar_url ? (
                  <img
                    src={req.avatar_url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="text-sm font-bold text-slate-900">{req.display_name}</p>
                  <p className="text-xs text-slate-500">{req.university || 'Студент'}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  onClick={() => handleRequest(req.id, 'accepted')}
                  size="sm"
                  className="flex-1 h-9 bg-blue-600 hover:bg-blue-700"
                >
                  <Check size={14} className="mr-1" /> Принять
                </Button>
                <Button
                  onClick={() => handleRequest(req.id, 'rejected')}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 text-slate-600 hover:text-rose-600 hover:border-rose-200"
                >
                  <X size={14} className="mr-1" /> Отклонить
                </Button>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <div className="p-10 text-center text-slate-400 text-sm italic">Нет новых запросов</div>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 p-5 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 flex items-center justify-between">
            Мои контакты
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {connectedContacts.length}
            </span>
          </h3>
        </div>
        <div className="flex-1 divide-y divide-slate-100 p-2 overflow-y-auto max-h-100">
          {connectedContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-all rounded-xl mx-1"
            >
              <div className="flex items-center gap-3">
                {contact.avatar_url ? (
                  <img
                    src={contact.avatar_url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="text-sm font-bold text-slate-900">{contact.display_name}</p>
                  <p className="text-xs text-slate-500">{contact.university || 'Студент'}</p>
                </div>
              </div>
            </div>
          ))}
          {connectedContacts.length === 0 && (
            <div className="p-10 text-center text-slate-400 text-sm">Список контактов пуст</div>
          )}
        </div>
      </div>
    </div>
  )
}
