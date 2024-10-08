import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ConfirmationDialog } from '~/components/ConfirmationDialog'
import userEvent, { UserEvent } from '@testing-library/user-event'

describe('<ConfirmationDialog />', () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })
  it('should be able to be triggered properly', async () => {
    render(
      <ConfirmationDialog onConfirm={jest.fn()} title="Confirm Dialog">
        <button data-testid="dummy-button">Click me</button>
      </ConfirmationDialog>,
    )
    await user.click(screen.getByTestId('dummy-button'))
    expect(screen.getByText('Confirm Dialog')).toBeInTheDocument()
  })
  it('should be able to dismiss the dialog', async () => {
    render(
      <ConfirmationDialog onConfirm={jest.fn()} title="Confirm Dialog">
        <button data-testid="dummy-button">Click me</button>
      </ConfirmationDialog>,
    )
    await user.click(screen.getByTestId('dummy-button'))
    await user.keyboard('[Escape]')
    expect(screen.queryByText('Deseja executar esta ação?')).toBeNull()
  })
})
