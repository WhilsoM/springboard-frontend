import { Button, cn, Input } from '@/shared'
import {
  Badge,
  Ban,
  CheckCircle2,
  Edit,
  FileText,
  Filter,
  Flag,
  ShieldCheck,
  Tags,
  Users,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

const VERIFICATIONS = [
  { id: 1, company: 'TechCorp Russia', inn: '7736207543', date: '2026-03-22', docs: 2 },
  { id: 2, company: 'SberTech Labs', inn: '7707083893', date: '2026-03-21', docs: 1 },
  { id: 3, company: 'Ozon', inn: '7704217370', date: '2026-03-20', docs: 3 },
]

const MODERATION_FEED = [
  {
    id: 101,
    title: 'Senior Backend Engineer (Crypto)',
    company: 'Unknown LLC',
    date: '2 hrs ago',
    content: 'Looking for developers to build an unregulated exchange...',
    flags: 2,
  },
  {
    id: 102,
    title: 'Intern Designer (Unpaid)',
    company: 'DesignStudio',
    date: '5 hrs ago',
    content: 'Full-time unpaid internship for 6 months doing client work...',
    flags: 0,
  },
]

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'verifications' | 'moderation' | 'users' | 'tags'>(
    'verifications',
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <ShieldCheck className="mr-2 h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-slate-900">Curator Panel</span>
        </div>

        <nav className="p-4 space-y-1">
          <Button
            onClick={() => setActiveTab('verifications')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeTab === 'verifications'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <ShieldCheck className="h-5 w-5" />
            Verifications
            <Badge className="ml-auto">3</Badge>
          </Button>

          <Button
            onClick={() => setActiveTab('moderation')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeTab === 'moderation'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <FileText className="h-5 w-5" />
            Content Moderation
            <Badge className="ml-auto">2</Badge>
          </Button>

          <Button
            onClick={() => setActiveTab('users')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <Users className="h-5 w-5" />
            Users & Roles
          </Button>

          <Button
            onClick={() => setActiveTab('tags')}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              activeTab === 'tags'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <Tags className="h-5 w-5" />
            Tags Management
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          {/* Top Bar */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="capitalize">{activeTab.replace('-', ' ')}</h2>
            <div className="flex items-center gap-3 text-slate-500">
              <img src="https://i.pravatar.cc/150?u=admin" />
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>

          {activeTab === 'verifications' && (
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
                          <Button className="text-blue-600 hover:underline">
                            {item.docs} files
                          </Button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                              title="Approve"
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                              title="Reject"
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
          )}

          {activeTab === 'moderation' && (
            <div className="space-y-4">
              {MODERATION_FEED.map((post) => (
                <div key={post.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                        {post.flags > 0 && (
                          <Badge className="gap-1">
                            <Flag className="h-3 w-3" /> {post.flags} Reports
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">
                        Posted by <span className="font-medium text-slate-700">{post.company}</span>{' '}
                        • {post.date}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-4 mb-4 border border-slate-100">
                    <p className="text-sm text-slate-700 line-clamp-2">{post.content}</p>
                    <Button className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                      View full text
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-2 text-slate-700 bg-slate-100 hover:bg-slate-200"
                    >
                      <Edit className="h-4 w-4" /> Edit Content
                    </Button>
                    <div className="flex-1"></div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Flag className="h-4 w-4" /> Warn User
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-rose-200 text-rose-700 hover:bg-rose-50"
                    >
                      <Ban className="h-4 w-4" /> Block Post
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'users' || activeTab === 'tags') && (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
              <FileText className="mb-4 h-12 w-12 text-slate-300" />
              <h2 className="mb-2 text-slate-900">Module under development</h2>
              <p>The {activeTab} management interface is currently being built.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
