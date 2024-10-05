import { ButtonSmall } from '~/components/Buttons'
import { useRegistrations } from '~/context/registrations-context'

interface Props {
  id: string
}

export function RepproveButton({ id }: Props) {
  const { updateStatus } = useRegistrations()

  function handleClick() {
    updateStatus(id, 'REPROVED')
  }
  return (
    <ButtonSmall onClick={handleClick} bgcolor="rgb(255, 145, 154)">
      Reprovar
    </ButtonSmall>
  )
}
