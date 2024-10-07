import { z } from 'zod'
import { isValidCPF } from '~/utils/validateCPF'

const fullNameSchema = z
  .string()
  .min(2, 'O nome deve conter pelo menos duas letras')
  .refine(
    (value) => value.includes(' '),
    'O nome deve conter pelo menos um espaço entre o nome e sobrenome',
  )
  .refine((value) => !/^\d/.test(value), {
    message: 'O nome não pode começar com um número',
  })

export const schema = z.object({
  name: fullNameSchema,
  email: z.string().email('Email inválido'),
  cpf: z
    .string()
    .min(1, 'Obrigatório')
    .refine((arg) => isValidCPF(arg), 'CPF Inválido'),
  admissionDate: z.string().date('Data Inválida'),
})

export type FormData = z.infer<typeof schema>
