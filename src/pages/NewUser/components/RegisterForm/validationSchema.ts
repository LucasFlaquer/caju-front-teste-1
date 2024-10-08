import { z } from 'zod'
import { isValidCPF } from '~/utils/validateCPF'

const fullNameSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .refine((value) => !/^\d/.test(value), {
    message: 'O nome não pode começar com um número',
  })
  .refine(
    (value) => value.replace(/[^a-zA-Z]/g, '').length >= 2,
    'O nome deve conter pelo menos duas letras',
  )
  .refine(
    (value) => value.includes(' '),
    'O nome deve conter pelo menos um espaço entre o nome e sobrenome',
  )

export const schema = z.object({
  name: fullNameSchema,
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  cpf: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine((arg) => isValidCPF(arg), 'CPF inválido'),
  admissionDate: z.string().min(1, 'Campo obrigatório').date('Data Inválida'),
})

export type FormData = z.infer<typeof schema>
