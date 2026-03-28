import { userApi } from '../api'
import {
  useUserStore,
  type ILoginRequest,
  type IRegisterRequest,
  type IUserMeApplicantResponse,
  type IUserMeEmployerResponse,
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

export const updateUserMeAction = async (
  userData:
    | Omit<IUserMeEmployerResponse, 'id' | 'role' | 'updated_at'>
    | Omit<IUserMeApplicantResponse, 'id' | 'role' | 'updated_at'>,
) => {
  const store = useUserStore.getState()
  useUserStore.setState({ isLoading: true })
  console.log('updateUserMeAction', userData)

  try {
    const { data } = await userApi.updateUserMe(userData)
    useUserStore.setState({
      user: store.user ? { ...store.user, ...data } : data,
    })
    console.log('FROM BACKEND', data)
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

export const verifyEmployerMeAction = async (inn: string, companyName: string) => {
  const store = useUserStore.getState()

  useUserStore.setState({ isLoading: true })
  try {
    await userApi.verifyEmployerMe(inn, companyName)

    useUserStore.setState({ user: { ...store.user, inn } as IUserMeEmployerResponse })
    await useUserStore.getState().getUserMe()
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

  if (store.user?.role === 'curator') return

  try {
    await userApi.updateAvatarUserMe(avatarUrl)
    if (store.user) {
      useUserStore.setState({
        user: { ...store.user, avatar_url: avatarUrl },
      })
    }
  } catch (error) {
    console.error('Failed to update user avatar:', error)
  } finally {
    useUserStore.setState({ isLoading: false })
  }
}

export const logoutAction = () => {
  localStorage.clear()
  useUserStore.setState({ user: null })
}

export const getContactsAction = async () => {
  try {
    const { data } = await userApi.getContacts()
    useUserStore.setState({ contacts: data.contacts })
  } catch (e) {
    console.error('Ошибка при получении контактов', e)
  }
}

export const sendRequestAction = async (receiverId: string) => {
  try {
    await userApi.sendNetworkRequest(receiverId)
  } catch (e) {
    console.error('Ошибка при отправке запроса', e)
  }
}

export const handleRequestAction = async (requestId: string, status: 'accepted' | 'rejected') => {
  try {
    await userApi.handleNetworkRequest(requestId, status)
    await getContactsAction()
  } catch (e) {
    console.error('Ошибка при обработке запроса', e)
  }
}

export const searchApplicantsAction = async (q: string) => {
  try {
    const { data } = await userApi.searchApplicants(q)
    return data.applicants
  } catch (e) {
    console.error('Search failed', e)
    return []
  }
}
