import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { HiOutlineX } from 'react-icons/hi'
import Button from '~/components/Buttons'
import {
  CloseButton,
  Content,
  Overlay,
} from '~/components/ConfirmationDialog/styles'

interface Props {
  title: string
  children: ReactNode
  onConfirm: () => void
}

export function ConfirmationDialog({ onConfirm, title, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content aria-describedby="Confirmation dialog">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description>Deseja executar esta ação?</Dialog.Description>
          <CloseButton asChild>
            <HiOutlineX size={18} />
          </CloseButton>
          <div>
            <Dialog.Close asChild>
              <Button $variant="cancel">Cancelar</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button onClick={onConfirm}>Confirmar</Button>
            </Dialog.Close>
          </div>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
