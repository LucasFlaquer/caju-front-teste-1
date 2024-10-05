export type RegistrationStatus = 'APPROVED' | 'REVIEW' | 'REPROVED'
export interface Registration {
  admissionDate: string
  email: string
  employeeName: string
  status: RegistrationStatus
  cpf: string
  id: string
}
