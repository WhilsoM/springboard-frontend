import { userApi } from '@/entities/user/api'
import { Button, Input } from '@/shared'
import { CheckCircle2, Filter, XCircle } from 'lucide-react'

const VERIFICATIONS = [
  {
    id: '1',
    employerId: 'emp-123',
    company: 'TechCorp Russia',
    inn: '7736207543',
    date: '2026-03-22',
    docs: 2,
  },
  {
    id: '2',
    employerId: 'emp-456',
    company: 'SberTech Labs',
    inn: '7707083893',
    date: '2026-03-21',
    docs: 1,
  },
  {
    id: '3',
    employerId: 'emp-789',
    company: 'Ozon',
    inn: '7704217370',
    date: '2026-03-20',
    docs: 3,
  },
]

export const VerificationTab = () => {
  const handleModerate = async (
    id: string,
    employerId: string,
    status: 'approved' | 'rejected',
  ) => {
    try {
      await userApi.moderateVerification(id, employerId, status)
      alert(`Статус заявки изменен на: ${status}`)
    } catch (error) {
      console.error('Ошибка при модерации:', error)
      alert('Не удалось изменить статус')
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
        <div className="relative w-64">
          <Input placeholder="Search INN or company..." />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Company Name</th>
              <th className="px-6 py-3 font-medium">Submitted INN</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Docs</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {VERIFICATIONS.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{item.company}</td>
                <td className="px-6 py-4 font-mono">{item.inn}</td>
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" className="text-blue-600 hover:underline px-0">
                    {item.docs} files
                  </Button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => handleModerate(item.id, item.employerId, 'approved')}
                      variant="outline"
                      size="sm"
                      className="h-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                    </Button>
                    <Button
                      onClick={() => handleModerate(item.id, item.employerId, 'rejected')}
                      variant="outline"
                      size="sm"
                      className="h-8 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                    >
                      <XCircle className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
