import { useUserStore, type IUserMeApplicantResponse } from '@/entities/user'
import { Button } from '@/shared'
import { Camera, GithubIcon, Globe, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApplicantTags } from './ApplicantTags'
import { ApplicantUpdateAvatar } from './ApplicantUpdateAvatar'
import { ApplicantUpdateInfo } from './ApplicantUpdateInfo'

export const ApplicantInfo = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAvatarUpdateOpen, setIsAvatarUpdateOpen] = useState(false)

  const navigate = useNavigate()
  const logout = useUserStore((s) => s.logout)
  const deleteUserAccount = useUserStore((s) => s.deleteUserMe)

  const user = useUserStore((s) => s.user) as IUserMeApplicantResponse
  const isLoading = useUserStore((s) => s.isLoading)

  if (isLoading && !user) return <div className="p-6 animate-pulse">Загрузка профиля...</div>

  if (!isLoading && !user) return <div className="p-6">Войдите в аккаунт</div>

  if (user && user.role !== 'applicant') return null

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col items-center">
        <div className="relative">
          {user?.avatar_url ? (
            <img
              src={user?.avatar_url}
              alt="user avatar"
              className="h-28 w-28 rounded-full border-4 border-white shadow-sm"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-slate-200 border-4 border-white shadow-sm" />
          )}

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

      <Button
        variant="default"
        className="text-white w-full h-12 rounded-xl font-bold bg-red-500  hover:bg-red-600"
        onClick={() => {
          logout()
          navigate('/')
        }}
      >
        Выйти из аккаунта
      </Button>

      <Button
        variant="default"
        className="text-white w-full h-12 rounded-xl font-bold bg-red-500  hover:bg-red-600"
        onClick={() => {
          deleteUserAccount()
          logout()
          navigate('/')
        }}
      >
        Удалить аккаунт
      </Button>

      <ApplicantUpdateInfo isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </div>
  )
}
