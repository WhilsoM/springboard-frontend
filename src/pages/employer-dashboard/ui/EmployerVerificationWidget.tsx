import { Button, Input } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { companyVerificationSchema, type CompanyVerificationValues } from '../model'

export const EmployerVerificationWidget = () => {
  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors },
  } = useForm<CompanyVerificationValues>({
    resolver: zodResolver(companyVerificationSchema),
    defaultValues: {
      inn: '',
    },
  })

  const onVerifySubmit = (data: CompanyVerificationValues) => {
    console.log('Submitting INN:', data.inn)
  }

  return (
    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-bold">Верификация</h3>
        <p className="bg-amber-400/10 text-amber-400 border-amber-400/20 p-1 rounded-sm">
          В ожидании
        </p>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        Подтвердите данные ИНН, чтобы получить статус проверенного работодателя.
      </p>

      <form onSubmit={handleVerifySubmit(onVerifySubmit)} className="space-y-4">
        <div>
          <Input
            {...registerVerify('inn')}
            placeholder="Ваш ИНН (10 или 12 цифр)"
            className={`h-12 rounded-xl transition-all ${
              verifyErrors.inn
                ? 'border-red-500 bg-red-50/10 focus:ring-red-500'
                : 'bg-white/5 border-white/10 text-white placeholder:text-slate-600'
            }`}
          />

          {verifyErrors.inn && (
            <p className="mt-1.5 text-xs font-medium text-red-400">{verifyErrors.inn.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl font-bold bg-white text-slate-900 hover:bg-slate-100 transition-transform active:scale-95"
        >
          Отправить на проверку
        </Button>
      </form>
    </div>
  )
}
