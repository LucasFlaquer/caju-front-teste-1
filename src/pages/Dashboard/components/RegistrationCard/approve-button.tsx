import { ButtonSmall } from '~/components/Buttons'
import { useRegistrations } from '~/context/registrations-context'

interface Props {
  id: string
}

export function AppproveButton({ id }: Props) {
  const { updateStatus } = useRegistrations()

  function handleClick() {
    updateStatus(id, 'APPROVED')
  }
  return (
    <ButtonSmall onClick={handleClick} bgcolor="rgb(155, 229, 155)">
      Aprovar
    </ButtonSmall>
  )
}
