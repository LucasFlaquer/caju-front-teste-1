import RegistrationCard from '~/pages/Dashboard/components/RegistrationCard'
import * as S from './styles'

interface Props {
  collumn: {
    status: string
    title: string
  } 
  registrations: any[]
}

export function ColumnItem({collumn, registrations}: Props) {
  return (
    <S.Column status={collumn.status} key={collumn.title}>
            <>
              <S.TitleColumn status={collumn.status}>
                {collumn.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
  )
}