import { ButtonSmall } from '~/components/Buttons'
import * as S from './styles'
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi'
import { Registration } from '~/interfaces/registrations'
import { useRegistrations } from '~/context/registrations-context'

type Props = {
  data: Registration
}

const RegistrationCard = ({ data }: Props) => {
  const { updateStatus } = useRegistrations()
  function handleRepprove() {
    updateStatus(data.id, 'REPROVED')
  }

  function handleReview() {
    updateStatus(data.id, 'REVIEW')
  }

  function handleApprove() {
    updateStatus(data.id, 'APPROVED')
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
            <ButtonSmall onClick={handleRepprove} bgcolor="rgb(255, 145, 154)">
              Reprovar
            </ButtonSmall>
            <ButtonSmall  bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
          </>
        ) : (
          <ButtonSmall onClick={handleReview} bgcolor="#ff8858">Revisar novamente</ButtonSmall>
        )}

        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  )
}

export default RegistrationCard
