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
import type { IApplicantUpdateAvatarProps } from '../model'

export const ApplicantUpdateAvatar = ({
  isDialogOpen,
  setIsDialogOpen,
}: IApplicantUpdateAvatarProps) => {
  const updateUserAvatar = useUserStore((state) => state.updateAvatarUserMe)
  const [avatarURL, setAvatarURL] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await updateUserAvatar(avatarURL)
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error)
    } finally {
      setIsDialogOpen(false)
    }
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
                value={avatarURL}
                onChange={(e) => setAvatarURL(e.target.value)}
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
