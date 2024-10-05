import RegistrationCard from '~/pages/Dashboard/components/RegistrationCard'
import * as S from './styles'
import { Registration } from '~/interfaces/registrations'

interface Props {
  collumn: {
    status: S.StatusKeys
    title: string
  }
  registrations: Registration[]
}

export function ColumnItem({ collumn, registrations }: Props) {
  return (
    <S.Column $status={collumn.status} key={collumn.title}>
      <>
        <S.TitleColumn $status={collumn.status}>{collumn.title}</S.TitleColumn>
        <S.CollumContent>
          {registrations.map((registration) => (
            <RegistrationCard data={registration} key={registration.id} />
          ))}
        </S.CollumContent>
      </>
    </S.Column>
  )
}
