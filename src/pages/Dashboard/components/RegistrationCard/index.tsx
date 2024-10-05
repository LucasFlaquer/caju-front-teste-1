import * as S from './styles'
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi'
import { Registration } from '~/interfaces/registrations'
import { RepproveButton } from './components/repprove-button'
import { AppproveButton } from './components/approve-button'
import { ReviewButton } from './components/review-button'
import { useRegistrations } from '~/context/registrations-context'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'

interface Props {
  data: Registration
}

const RegistrationCard = ({ data }: Props) => {
  const { removeRegistration } = useRegistrations()

  function handleDelete() {
    removeRegistration(data.id)
  }
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status === 'REVIEW' ? (
          <>
            <RepproveButton id={data.id} />
            <AppproveButton id={data.id} />
          </>
        ) : (
          <ReviewButton id={data.id} />
        )}
        <ConfirmationDialog onConfirm={handleDelete} title="Remover">
          <S.RemoveButton>
            <HiOutlineTrash size={16} />
          </S.RemoveButton>
        </ConfirmationDialog>
      </S.Actions>
    </S.Card>
  )
}

export default RegistrationCard
