import { Collumns } from './components/Columns'
import * as S from './styles'
import { SearchBar } from './components/Searchbar'
import { useRegistrations } from '~/context/registrations-context'
import { Loading } from '~/components/Loading'

const DashboardPage = () => {
  const { registrations, isLoading } = useRegistrations()

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} />
      {isLoading && <Loading />}
    </S.Container>
  )
}
export default DashboardPage
