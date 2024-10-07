import { Button } from '.'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Button component', () => {
  it('renders the default Button variant', () => {
    render(<Button>Default Button</Button>)
    const buttonElement = screen.getByText('Default Button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveStyle('background-color: #64a98c')
  })

  it('renders the cancel Button variant', () => {
    render(<Button $variant="cancel">Cancel Button</Button>)
    const buttonElement = screen.getByText('Cancel Button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveStyle('background-color: rgba(232, 5, 55, 1)')
  })

  it('applies the correct styles for height and padding', () => {
    render(<Button>Styled Button</Button>)
    const buttonElement = screen.getByText('Styled Button')

    expect(buttonElement).toHaveStyle('height: 56px')
    expect(buttonElement).toHaveStyle('padding: 8px 32px')
  })
})
