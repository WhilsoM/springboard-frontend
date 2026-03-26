import { useUserStore } from '@/entities/user'
import { Button } from '@/shared'
import { Camera, GithubIcon, Globe, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ApplicantTags } from './ApplicantTags'
import { ApplicantUpdateAvatar } from './ApplicantUpdateAvatar'
import { ApplicantUpdateInfo } from './ApplicantUpdateInfo'

export const ApplicantInfo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAvatarUpdateOpen, setIsAvatarUpdateOpen] = useState(false)

  const user = useUserStore((s) => s.user)

  if (user?.role !== 'applicant') return

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          <img
            src={user?.avatar_url}
            alt="user avatar"
            className="h-28 w-28 border-4 border-white shadow-sm"
          />
          <Button
            onClick={() => setIsAvatarUpdateOpen(true)}
            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <ApplicantUpdateAvatar
            isDialogOpen={isAvatarUpdateOpen}
            setIsDialogOpen={setIsAvatarUpdateOpen}
          />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{user?.display_name}</h3>
        <p className="flex items-center gap-1 text-sm text-slate-500 mt-1">
          <GraduationCap className="h-4 w-4" /> {user.university}
        </p>
      </div>

      <ApplicantTags />

      <div className="pt-4 space-y-3 border-t border-slate-100">
        <p className="flex items-center gap-2">
          <GithubIcon />
          <Link
            className="hover:opacity-70 transition-opacity"
            to={user.github_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.github_url}
          </Link>
        </p>
        <p className="flex items-center gap-2 mb-4">
          <Globe />
          <Link
            className="hover:opacity-70 transition-opacity"
            to={user.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.portfolio_url}
          </Link>
        </p>
      </div>

      <Button onClick={() => setIsDialogOpen(true)} className="w-full">
        Update Profile
      </Button>

      <ApplicantUpdateInfo isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </div>
  )
}
