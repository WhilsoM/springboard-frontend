import { useUserStore, type IUserMeApplicantResponse } from '@/entities/user'
import { userApi } from '@/entities/user/api'
import { Button, Input } from '@/shared'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'

export const FindApplicantsPage = () => {
  const { user: currentUser } = useUserStore()
  const [applicants, setApplicants] = useState<IUserMeApplicantResponse[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [sentRequests, setSentRequests] = useState<string[]>([])
  const [requestingId, setRequestingId] = useState<string | null>(null)

  const fetchApplicants = useCallback(
    async (query: string) => {
      setIsLoading(true)
      setError(null)
      try {
        const { data } = await userApi.searchApplicants(query)
        const filtered = (data.applicants || []).filter((app) => app.id !== currentUser?.id)
        setApplicants(filtered)
      } catch (err: unknown) {
        setError('Ошибка при поиске: ' + (err as Error)?.message)
      } finally {
        setIsLoading(false)
      }
    },
    [currentUser?.id],
  )

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchApplicants(searchQuery)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchApplicants, searchQuery])

  const handleSendRequest = async (receiverId: string) => {
    setRequestingId(receiverId)
    try {
      await userApi.sendNetworkRequest(receiverId)

      setSentRequests((prev) => [...prev, receiverId])
    } catch (err: unknown) {
      alert('Ошибка при отправке')
      console.log(err)
    } finally {
      setRequestingId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Поиск соискателей</h1>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Поиск по имени или университету..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading && <p className="text-gray-500">Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && applicants.length === 0 && (
        <p className="text-gray-500 text-center">Ничего не найдено.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applicants.map((applicant) => {
          const isSent = sentRequests.includes(applicant.id)

          return (
            <div key={applicant.id} className="border p-4 rounded-lg flex items-center space-x-4">
              {applicant.avatar_url ? (
                <img
                  src={applicant.avatar_url}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              )}
              <div className="flex-1">
                <Link
                  to={`/applicants/${applicant.id}`}
                  className="font-semibold text-lg hover:underline"
                >
                  {applicant.display_name}
                </Link>
                <p className="text-sm text-gray-600">
                  {applicant.university || 'Университет не указан'}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => handleSendRequest(applicant.id)}
                  disabled={requestingId === applicant.id || isSent}
                  className={`px-3 py-1 rounded transition-colors ${
                    isSent
                      ? 'bg-gray-100 text-gray-500 cursor-default'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {requestingId === applicant.id
                    ? 'Отправка...'
                    : isSent
                      ? 'Запрос отправлен'
                      : 'В контакты'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
