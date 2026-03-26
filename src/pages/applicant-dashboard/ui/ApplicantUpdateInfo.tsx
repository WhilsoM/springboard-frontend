import { useUserStore, type IUserMeApplicantResponse, type IUserMeResponse } from '@/entities/user'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  updateUserInfoSchema,
  type IApplicantUpdateInfoProps,
  type UpdateUserInfoValues,
} from '../model'

export const ApplicantUpdateInfo = ({
  isDialogOpen,
  setIsDialogOpen,
}: IApplicantUpdateInfoProps) => {
  const user = useUserStore((s) => s.user) as IUserMeApplicantResponse
  const updateUserMe = useUserStore((s) => s.updateUserMe)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateUserInfoValues>({
    resolver: zodResolver(updateUserInfoSchema),
    values: {
      email: user?.email || '',
      display_name: user?.display_name || '',
      university: user?.university || '',
      course: user?.course || 1,
      portfolio_url: user?.portfolio_url || '',
      github_url: user?.github_url || '',
    },
  })

  useEffect(() => {
    if (isDialogOpen && user) {
      reset({
        email: user.email,
        display_name: user.display_name,
        university: user.university || '',
        course: user.course || 1,
        portfolio_url: user.portfolio_url || '',
        github_url: user.github_url || '',
      })
    }
  }, [isDialogOpen, user, reset])

  const onSubmit = async (data: UpdateUserInfoValues) => {
    if (!user) return

    try {
      const baseUserData = {
        email: user.email,
        display_name: user.display_name,
        is_private: user.is_private,
      }
      await updateUserMe({
        ...baseUserData,
        ...data,
      } as Omit<IUserMeResponse, 'role' | 'id'>)

      setIsDialogOpen(false)
    } catch (e) {
      console.error('Update error:', e)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Обновить профиль</DialogTitle>
            <DialogDescription>Обновите информацию о себе.</DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="email">Почта</Label>
              <Input
                {...register('email')}
                type="email"
                id="email"
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <span className="text-destructive text-xs">{errors.email.message}</span>
              )}
            </Field>

            <Field>
              <Label htmlFor="display_name">Отображаемое имя</Label>
              <Input
                {...register('display_name')}
                id="display_name"
                className={errors.display_name ? 'border-destructive' : ''}
              />
              {errors.display_name && (
                <span className="text-destructive text-xs">{errors.display_name.message}</span>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="university">Университет</Label>
                <Input
                  {...register('university')}
                  id="university"
                  className={errors.university ? 'border-destructive' : ''}
                />
              </Field>

              <Field>
                <Label htmlFor="course">Курс</Label>
                <Input
                  {...register('course', { valueAsNumber: true })}
                  type="number"
                  id="course"
                  className={errors.course ? 'border-destructive' : ''}
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="portfolio_url">Ссылка на портфолио</Label>
              <Input
                {...register('portfolio_url')}
                id="portfolio_url"
                className={errors.portfolio_url ? 'border-destructive' : ''}
              />
            </Field>

            <Field>
              <Label htmlFor="github_url">Ссылка на Github</Label>
              <Input
                {...register('github_url')}
                id="github_url"
                className={errors.github_url ? 'border-destructive' : ''}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Отмена
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
