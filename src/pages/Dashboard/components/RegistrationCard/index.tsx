import * as S from './styles'
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi'
import { Registration } from '~/interfaces/registrations'
import { RepproveButton } from './repprove-button'
import { AppproveButton } from './approve-button'
import { ReviewButton } from './review-button'
import { useRegistrations } from '~/context/registrations-context'

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
        <S.RemoveButton onClick={handleDelete}>
          <HiOutlineTrash size={16} />
        </S.RemoveButton>
      </S.Actions>
    </S.Card>
  )
}

export default RegistrationCard
