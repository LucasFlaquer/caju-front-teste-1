import { Controller, useForm } from 'react-hook-form'
import { Button } from '~/components/Buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormData, schema } from './validationSchema'
import { TextField } from '~/components/Form/TextField'
import { MaskedInput } from '~/components/Form/TextField/MaskedInput'
import { CPF_MASK } from '~/components/Form/validationMasks'
import { api } from '~/api'
import { useHistory } from 'react-router-dom'
import routes from '~/router/routes'
import { createLocalDate, dateFormatter } from '~/utils/formatDate'
import { useToast } from '~/hooks/useToast'
import { extractDigits } from '~/utils/extractDigits'

const INITIAL_STATUS = 'REVIEW'

export function RegisterForm() {
  const history = useHistory()
  const { notifyError } = useToast()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormData) {
    try {
      await api.post('/registrations', {
        admissionDate: dateFormatter(createLocalDate(values.admissionDate)),
        email: values.email,
        employeeName: values.name,
        status: INITIAL_STATUS,
        cpf: extractDigits(values.cpf),
      })
      history.push(routes.dashboard)
    } catch (error) {
      notifyError('Erro ao cadastrar, tente novamente.')
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        placeholder="Nome"
        label="Nome"
        id="name"
        {...register('name')}
        error={errors.name?.message}
      />
      <TextField
        placeholder="Email"
        label="Email"
        id="email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Controller
        control={control}
        name={'cpf'}
        defaultValue={''}
        render={({ field }) => (
          <MaskedInput
            mask={CPF_MASK}
            placeholder="CPF"
            id="cpf"
            label="CPF"
            {...field}
            error={errors.cpf?.message}
          />
        )}
      />
      <TextField
        label="Data de admissão"
        type="date"
        id="admissionDate"
        {...register('admissionDate')}
        error={errors.admissionDate?.message}
      />
      <Button type="submit">Cadastrar</Button>
    </form>
  )
}
