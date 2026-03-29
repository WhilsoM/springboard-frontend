import { apiInstance } from '@/shared'
import type {
  ILoginRequest,
  IRegisterRequest,
  ITokens,
  IUserMeApplicantResponse,
  IUserMeEmployerResponse,
  IUserMeResponse,
} from '../model'

export const userApi = {
  createNewUser: (userData: IRegisterRequest) =>
    apiInstance.post<ITokens>('/auth/register', userData),
  loginUser: (userData: ILoginRequest) => apiInstance.post<ITokens>('/auth/login', userData),
  getUserMe: () => apiInstance.get<IUserMeResponse>('/users/me'),
  updateUserMe: (
    userData:
      | Omit<IUserMeEmployerResponse, 'id' | 'role' | 'updated_at'>
      | Omit<IUserMeApplicantResponse, 'id' | 'role' | 'updated_at'>,
  ) => apiInstance.put<IUserMeResponse>('/users/me', userData),
  deleteUserMe: () => apiInstance.delete('/users/me'),
  verifyEmployerMe: (inn: string, company_name: string) =>
    apiInstance.post('/employer/verify', { inn, company_name }),
  updateIsPrivateUserMe: (isPrivate: boolean) =>
    apiInstance.patch('/users/me/privacy', { is_private: isPrivate }),
  updateAvatarUserMe: (avatarUrl: string) =>
    apiInstance.patch('/users/me/avatar', { avatar_url: avatarUrl }),
  searchApplicants: (query?: string) =>
    apiInstance.get<{ applicants: IUserMeApplicantResponse[] }>('/applicants', {
      params: { q: query },
    }),

  sendNetworkRequest: (receiverId: string) => apiInstance.post(`/network/request/${receiverId}`),

  handleNetworkRequest: (requestId: string, status: 'accepted' | 'rejected') =>
    apiInstance.patch(`/network/request/${requestId}`, { status }),

  getContacts: () => apiInstance.get<{ contacts: IUserMeApplicantResponse[] }>('/network/contacts'),

  createCurator: (data: { email: string; password: string; display_name?: string }) =>
    apiInstance.post('/admin/curators', data),

  moderateVerification: (id: string, employerId: string, status: 'approved' | 'rejected') =>
    apiInstance.patch(`/admin/verifications/${id}/status`, {
      employer_id: employerId,
      status,
    }),

  deleteOpportunity: (id: string) => apiInstance.delete(`/admin/opportunities/${id}`),

  apply: (oppId: string) => apiInstance.post(`/opportunities/${oppId}/apply`),
  getApplicantsForOpp: (oppId: string) =>
    apiInstance.get(`/employer/opportunities/${oppId}/applications`),
  updateStatus: (appId: string, status: 'accepted' | 'rejected') =>
    apiInstance.patch(`/employer/applications/${appId}/status`, { status }),
}
