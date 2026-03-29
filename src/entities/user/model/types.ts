export type UserRole = 'employer' | 'applicant' | 'curator'

export type IUserMeResponse =
  | IUserMeEmployerResponse
  | IUserMeApplicantResponse
  | IUserMeCuratorResponse

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

export interface IUserMeCuratorResponse extends IBaseUserResponse {
  role: 'curator'
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

export interface INetworkRequest {
  id: string
  sender_id: string
  receiver_id: string
  status: 'pending' | 'accepted' | 'rejected'
  sender_name?: string
}

export interface IUserStore {
  user: IUserMeResponse | null
  isLoading: boolean
  token: string | null
  contacts: IUserMeApplicantResponse[]
  pendingRequests: IUserMeApplicantResponse[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applications: any[]
  isAppsLoading: boolean

  apply: (oppId: string) => Promise<void>
  getOppApplications: (oppId: string) => Promise<void>
  updateStatus: (appId: string, status: 'accepted' | 'rejected') => Promise<void>
  getContacts: () => Promise<void>
  sendRequest: (receiverId: string) => Promise<void>
  handleRequest: (requestId: string, status: 'accepted' | 'rejected') => Promise<void>
  searchApplicants: (q: string) => Promise<IUserMeApplicantResponse[]>
  createNewUser: (userData: IRegisterRequest) => Promise<void>
  loginUser: (userData: ILoginRequest) => Promise<void>
  getUserMe: () => Promise<void>
  setTokens: (access_token: string, refresh_token: string) => void
  logout: () => void
  updateUserMe: (
    userData:
      | Omit<IUserMeEmployerResponse, 'id' | 'role' | 'updated_at'>
      | Omit<IUserMeApplicantResponse, 'id' | 'role' | 'updated_at'>,
  ) => Promise<void>
  deleteUserMe: () => Promise<void>
  verifyEmployerMe: (inn: string, companyName: string) => Promise<void>
  updateIsPrivateUserMe: (isPrivate: boolean) => Promise<void>
  updateAvatarUserMe: (avatarUrl: string) => Promise<void>
}
