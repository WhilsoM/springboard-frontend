import { Button, Input } from '@/shared'
import { useState } from 'react'

export const AdminTab = () => {
  const [emailNewAdmin, setEmailNewAdmin] = useState('')
  const [passwordNewAdmin, setPasswordNewAdmin] = useState('')

  return (
    <div>
      <h1 className="font-bold">Администраторы</h1>

      <h2 className="text-xl font-semibold mt-5 mb-5">Добавить нового администратора</h2>
      <div className="flex flex-col gap-4 max-w-sm">
        <Input
          placeholder="Введите почту нового администратора..."
          value={emailNewAdmin}
          onChange={(e) => setEmailNewAdmin(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Введите пароль нового администратора..."
          type="password"
          value={passwordNewAdmin}
          onChange={(e) => setPasswordNewAdmin(e.target.value)}
        />
        <Button>Отправить</Button>
      </div>
    </div>
  )
}
