import { ButtonSmall } from '~/components/Buttons'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'
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
    <ConfirmationDialog onConfirm={handleClick} title="Revisar">
      <ButtonSmall $bgcolor="#ff8858">Revisar</ButtonSmall>
    </ConfirmationDialog>
  )
}
