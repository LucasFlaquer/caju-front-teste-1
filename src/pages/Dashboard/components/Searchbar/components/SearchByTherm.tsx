import { useEffect, useState } from 'react'
import { MaskedInput } from '~/components/Form/TextField/MaskedInput'
import { CPF_MASK } from '~/components/Form/validationMasks'
import { useRegistrations } from '~/context/registrations-context'
import { useDebounce } from '~/hooks/useDebounce'
import { isValidCPF } from '~/utils/validateCPF'

export function SearchByTherm() {
  const { fetchByCPF } = useRegistrations()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (!isValidCPF(debouncedSearchTerm)) return
    fetchByCPF(debouncedSearchTerm)
  }, [debouncedSearchTerm, fetchByCPF])

  return (
    <MaskedInput
      mask={CPF_MASK}
      placeholder="Digite um CPF válido"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
