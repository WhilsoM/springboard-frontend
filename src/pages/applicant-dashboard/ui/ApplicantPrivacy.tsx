import { Input, cn } from '@/shared'
import { ShieldAlert } from 'lucide-react'
import { useState } from 'react'

export const ApplicantPrivacy = () => {
  const [isPublic, setIsPublic] = useState(true)
  const [showResume, setShowResume] = useState(false)

  return (
    <div className="overflow-hidden border-amber-200">
      <div className="bg-amber-50 p-4 border-b border-amber-100 flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-amber-600" />
        <h3 className="font-semibold text-amber-900">Privacy & Visibility</h3>
      </div>
      <div className="p-5 space-y-6">
        <label className="flex items-start justify-between cursor-pointer group">
          <div className="pr-4">
            <p className="text-sm font-medium text-slate-900">Show profile in student search</p>
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
  )
}
