export type UserRole = 'employer' | 'applicant' | 'curator'

export type IUserMeResponse = IUserMeEmployerResponse | IUserMeApplicantResponse

export interface ITokens {
  access_token: string
  refresh_token: string
}

export interface IRegisterRequest {
  role: string
  email: string
  display_name: string
  password: string
}

export interface ILoginRequest {
  email: string
  password: string
}

interface IBaseUserResponse {
  id: string
  role: UserRole
  email: string
  display_name: string
  is_private: boolean
}

export interface IUserMeEmployerResponse extends IBaseUserResponse {
  role: 'employer'
  company_name: string
  is_verified: boolean
  inn: string
  description: string
  avatar_url: string
  website_url: string
  updated_at: string
}

export interface IUserMeApplicantResponse extends IBaseUserResponse {
  role: 'applicant'
  university: string
  course: number
  skills: string[]
  portfolio_url: string
  github_url: string
  avatar_url: string
  updated_at: string
}

export interface IUserStore {
  user: IUserMeResponse | null
  isLoading: boolean
  createNewUser: (userData: IRegisterRequest) => Promise<void>
  loginUser: (userData: ILoginRequest) => Promise<void>
  getUserMe: () => Promise<void>
  setTokens: (access_token: string, refresh_token: string) => void
  logout: () => void
  updateUserMe: (userData: Omit<IUserMeResponse, 'role' | 'id'>) => Promise<void>
  deleteUserMe: () => Promise<void>
  verifyEmployerMe: (inn: string) => Promise<void>
  updateIsPrivateUserMe: (isPrivate: boolean) => Promise<void>
  updateAvatarUserMe: (avatarUrl: string) => Promise<void>
}
