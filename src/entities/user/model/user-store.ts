/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  applyToOpportunityAction,
  createNewUserAction,
  deleteUserMeAction,
  getContactsAction,
  getOpportunityApplicationsAction,
  getUserMeAction,
  handleRequestAction,
  loginAction,
  logoutAction,
  searchApplicantsAction,
  sendRequestAction,
  updateApplicationStatusAction,
  updateAvatarUserMeAction,
  updateIsPrivateUserMeAction,
  updateUserMeAction,
  verifyEmployerMeAction,
} from './actions'
import type { IUserMeApplicantResponse, IUserMeResponse, IUserStore } from './types'

export const useUserStore = create<IUserStore>()(
  persist(
    () => ({
      user: null as IUserMeResponse | null,
      isLoading: false as boolean,
      token: null as string | null,
      contacts: [] as IUserMeApplicantResponse[],
      pendingRequests: [] as IUserMeApplicantResponse[],
      applications: [] as any[],
      isAppsLoading: false as boolean,

      apply: applyToOpportunityAction,
      getOppApplications: getOpportunityApplicationsAction,
      updateStatus: updateApplicationStatusAction,
      getContacts: getContactsAction,
      sendRequest: sendRequestAction,
      handleRequest: handleRequestAction,
      searchApplicants: searchApplicantsAction,

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
    }),
    {
      name: 'auth-storage',
    },
  ),
)
