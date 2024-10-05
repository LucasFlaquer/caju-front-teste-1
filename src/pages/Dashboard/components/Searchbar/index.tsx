import { HiRefresh } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'
import Button from '~/components/Buttons'
import { IconButton } from '~/components/Buttons/IconButton'
import TextField from '~/components/TextField'
import routes from '~/router/routes'
import * as S from './styles'
import { useRegistrations } from '~/context/registrations-context'

export function SearchBar() {
  const history = useHistory()
  const { refreshList } = useRegistrations()

  function goToNewAdmissionPage() {
    history.push(routes.newUser)
  }

  function handleRefetch() {
    refreshList()
  }

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton onClick={handleRefetch} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
