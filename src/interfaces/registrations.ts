export interface Registration {
  admissionDate: string
  email: string
  employeeName: string
  status: 'APPROVED' | 'REVIEW' | 'REPROVED'
  cpf: string
  id: string
}
