import { ButtonSmall } from '~/components/Buttons'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'
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
    <ConfirmationDialog onConfirm={handleClick} title="Aprovar">
      <ButtonSmall $bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>
    </ConfirmationDialog>
  )
}
