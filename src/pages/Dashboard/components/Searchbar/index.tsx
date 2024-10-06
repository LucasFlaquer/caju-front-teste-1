import { HiRefresh } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'
import Button from '~/components/Buttons'
import { IconButton } from '~/components/Buttons/IconButton'
import routes from '~/router/routes'
import * as S from './styles'
import { useRegistrations } from '~/context/registrations-context'

import { CPF_MASK } from '~/components/Form/validationMasks'
import { MaskedInput } from '~/components/Form/TextField/MaskedInput'
import { useEffect, useState } from 'react'
import { isValidCPF } from '~/utils/validateCPF'

export function SearchBar() {
  const history = useHistory()
  const { refreshList, fetchByCPF } = useRegistrations()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!isValidCPF(searchTerm)) return
      fetchByCPF(searchTerm)
      setSearchTerm('')
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  function goToNewAdmissionPage() {
    history.push(routes.newUser)
  }

  function handleRefetch() {
    refreshList()
  }

  return (
    <S.Container>
      <MaskedInput
        mask={CPF_MASK}
        placeholder="Digite um CPF válido"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <S.Actions>
        <IconButton onClick={handleRefetch} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
