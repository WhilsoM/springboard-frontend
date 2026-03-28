import { userApi } from '@/entities/user/api'
import { Button, Input } from '@/shared'
import { useState } from 'react'

export const AdminTab = () => {
  const [emailNewAdmin, setEmailNewAdmin] = useState('')
  const [passwordNewAdmin, setPasswordNewAdmin] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateCurator = async () => {
    if (!emailNewAdmin || !passwordNewAdmin) return

    setIsLoading(true)
    try {
      await userApi.createCurator({
        email: emailNewAdmin,
        password: passwordNewAdmin,
        display_name: 'Куратор',
      })
      alert('Куратор успешно создан!')
      setEmailNewAdmin('')
      setPasswordNewAdmin('')
    } catch (error) {
      console.error('Ошибка при создании куратора:', error)
      alert('Не удалось создать куратора')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="font-bold">Администраторы</h1>

      <h2 className="text-xl font-semibold mt-5 mb-5">Добавить нового администратора (Куратора)</h2>
      <div className="flex flex-col gap-4 max-w-sm">
        <Input
          placeholder="Введите почту..."
          value={emailNewAdmin}
          onChange={(e) => setEmailNewAdmin(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Введите пароль..."
          type="password"
          value={passwordNewAdmin}
          onChange={(e) => setPasswordNewAdmin(e.target.value)}
        />
        <Button onClick={handleCreateCurator} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Отправить'}
        </Button>
      </div>
    </div>
  )
}
