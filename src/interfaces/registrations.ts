export interface Registration {
  admissionDate: string
  email: string
  employeeName: string
  status: 'APROVED' | 'REVIEW' | 'REPROVED'
  cpf: string
  id: string
}
