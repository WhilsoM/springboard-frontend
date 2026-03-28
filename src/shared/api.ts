import axios from 'axios'
import qs from 'qs'

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
})

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // check if error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return apiInstance(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
