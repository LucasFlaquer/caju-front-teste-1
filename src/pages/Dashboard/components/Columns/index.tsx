import { Registration } from '~/interfaces/registrations'
import * as S from './styles'
import { ColumnItem } from '~/pages/Dashboard/components/Columns/colum-item'

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
]

type Props = {
  registrations: Registration[]
}
export function Collumns(props: Props) {
  return (
    <S.Container>
      {allColumns.map((collumn) => (
        <ColumnItem
          key={collumn.status}
          collumn={collumn}
          registrations={props.registrations}
        />
      ))}
    </S.Container>
  )
}
