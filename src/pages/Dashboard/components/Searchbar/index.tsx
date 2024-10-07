import { HiRefresh } from 'react-icons/hi'
import { useHistory } from 'react-router-dom'
import { Button } from '~/components/Buttons'
import { IconButton } from '~/components/Buttons/IconButton'
import routes from '~/router/routes'
import * as S from './styles'
import { useRegistrations } from '~/context/registrations-context'
import { SearchByTherm } from './components/SearchByTherm'

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
      <SearchByTherm />
      <S.Actions>
        <IconButton onClick={handleRefetch} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
