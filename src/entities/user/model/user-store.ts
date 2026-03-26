import { create } from 'zustand'
import {
  createNewUserAction,
  deleteUserMeAction,
  getUserMeAction,
  loginAction,
  logoutAction,
  updateAvatarUserMeAction,
  updateIsPrivateUserMeAction,
  updateUserMeAction,
  verifyEmployerMeAction,
} from './actions'
import type { IUserStore } from './types'

export const useUserStore = create<IUserStore>()(() => ({
  user: null,
  isLoading: false,

  createNewUser: createNewUserAction,

  loginUser: loginAction,

  getUserMe: getUserMeAction,

  logout: logoutAction,

  updateUserMe: updateUserMeAction,

  deleteUserMe: deleteUserMeAction,

  verifyEmployerMe: verifyEmployerMeAction,

  updateIsPrivateUserMe: updateIsPrivateUserMeAction,

  updateAvatarUserMe: updateAvatarUserMeAction,

  setTokens: (access_token: string, refresh_token: string) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  },
}))
