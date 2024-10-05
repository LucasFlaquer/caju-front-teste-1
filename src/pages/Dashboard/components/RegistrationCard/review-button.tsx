import { ButtonSmall } from '~/components/Buttons'
import { useRegistrations } from '~/context/registrations-context'

interface Props {
  id: string
}

export function ReviewButton({ id }: Props) {
  const { updateStatus } = useRegistrations()

  function handleClick() {
    updateStatus(id, 'REVIEW')
  }
  return (
    <ButtonSmall onClick={handleClick} bgcolor="#ff8858">
      Revisar novamente
    </ButtonSmall>
  )
}
