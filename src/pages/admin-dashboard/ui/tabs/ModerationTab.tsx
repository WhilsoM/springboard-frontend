import { Button } from '@/shared'
import { Badge, Ban, Edit, Flag } from 'lucide-react'

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

export const ModerationTab = () => {
  return (
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
                Posted by <span className="font-medium text-slate-700">{post.company}</span> •{' '}
                {post.date}
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
  )
}
