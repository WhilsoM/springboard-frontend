import { useUserStore } from '@/entities/user'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Field,
  FieldGroup,
  Input,
  Label,
} from '@/shared'
import { useState } from 'react'
import type { IEmployerUpdateAvatarProps } from '../model'

export const EmployerUpdateAvatar = ({
  isDialogOpen,
  setIsDialogOpen,
}: IEmployerUpdateAvatarProps) => {
  const updateAvatarUserMe = useUserStore((state) => state.updateAvatarUserMe)
  const [avatarUrl, setAvatarUrl] = useState('')

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateAvatarUserMe(avatarUrl)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Обновить Аватар</DialogTitle>
            <DialogDescription>Загрузите новое изображение для вашего профиля.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="url">Введите ссылку на изображение</Label>
              <Input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                type="url"
                id="url"
                placeholder="https://example.com/image.jpg"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
