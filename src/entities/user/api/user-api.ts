import { apiInstance } from '@/shared'
import type { ILoginRequest, IRegisterRequest, ITokens, IUserMeResponse } from '../model'

export const userApi = {
  createNewUser: (userData: IRegisterRequest) =>
    apiInstance.post<ITokens>('/auth/register', userData),
  loginUser: (userData: ILoginRequest) => apiInstance.post<ITokens>('/auth/login', userData),
  getUserMe: () => apiInstance.get<IUserMeResponse>('/users/me'),
  updateUserMe: (userData: Omit<IUserMeResponse, 'role' | 'id'>) =>
    apiInstance.put<IUserMeResponse>('/users/me', userData),
  deleteUserMe: () => apiInstance.delete('/users/me'),
  verifyEmployerMe: (inn: string) => apiInstance.post('/users/me/verify', inn),
  updateIsPrivateUserMe: (isPrivate: boolean) =>
    apiInstance.patch('/users/me/privacy', { is_private: isPrivate }),
  updateAvatarUserMe: (avatarUrl: string) =>
    apiInstance.patch('/users/me/avatar', { avatar_url: avatarUrl }),
}
