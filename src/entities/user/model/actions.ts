import { userApi } from '../api'
import {
  useUserStore,
  type ILoginRequest,
  type IRegisterRequest,
  type IUserMeEmployerResponse,
  type IUserMeResponse,
} from '../model'

export const loginAction = async (userData: ILoginRequest) => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })

  try {
    const { data } = await userApi.loginUser(userData)

    store.setTokens(data.access_token, data.refresh_token)
    await store.getUserMe()
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const createNewUserAction = async (userData: IRegisterRequest) => {
  const store = useUserStore.getState()
  useUserStore.setState({ isLoading: true })

  try {
    const { data } = await userApi.createNewUser(userData)

    store.setTokens(data.access_token, data.refresh_token)

    const { data: user } = await userApi.getUserMe()
    useUserStore.setState({ user })
  } catch (error) {
    console.error('Failed to create new user:', error)
    throw error
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const getUserMeAction = async () => {
  useUserStore.setState({ isLoading: true })
  try {
    const { data } = await userApi.getUserMe()
    useUserStore.setState({ user: data })
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    useUserStore.setState({ user: null })
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const updateUserMeAction = async (userData: Omit<IUserMeResponse, 'role' | 'id'>) => {
  useUserStore.setState({ isLoading: true })
  try {
    const { data } = await userApi.updateUserMe(userData)
    useUserStore.setState({ user: data })
  } catch (error) {
    console.error('Failed to update user data:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const deleteUserMeAction = async () => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })
  try {
    await userApi.deleteUserMe()
    store.logout()
  } catch (error) {
    console.error('Failed to delete user:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const verifyEmployerMeAction = async (inn: string) => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })
  try {
    await userApi.verifyEmployerMe(inn)

    useUserStore.setState({ user: { ...store.user, inn } as IUserMeEmployerResponse })
  } catch (error) {
    console.error('Failed to verify employer:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const updateIsPrivateUserMeAction = async (isPrivate: boolean) => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })
  try {
    await userApi.updateIsPrivateUserMe(isPrivate)
    await store.getUserMe()
  } catch (error) {
    console.error('Failed to update user privacy:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const updateAvatarUserMeAction = async (avatarUrl: string) => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })
  try {
    await userApi.updateAvatarUserMe(avatarUrl)
    await store.getUserMe()
  } catch (error) {
    console.error('Failed to update user avatar:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const logoutAction = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  useUserStore.setState({ user: null })
}
