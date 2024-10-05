import { ButtonSmall } from '~/components/Buttons'
import { useRegistrations } from '~/context/registrations-context'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'

interface Props {
  id: string
}

export function RepproveButton({ id }: Props) {
  const { updateStatus } = useRegistrations()

  function handleClick() {
    updateStatus(id, 'REPROVED')
  }
  return (
    <ConfirmationDialog onConfirm={handleClick} title="Reprovar Candidato">
      <ButtonSmall $bgcolor="rgb(255, 145, 154)">Reprovar</ButtonSmall>
    </ConfirmationDialog>
  )
}
