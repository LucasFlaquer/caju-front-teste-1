import { Button, ButtonSmall } from '.'
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

describe('ButtonSmall component', () => {
  it('renders the ButtonSmall with default styles', () => {
    render(<ButtonSmall>Small Button</ButtonSmall>)
    const buttonSmallElement = screen.getByText('Small Button')

    expect(buttonSmallElement).toBeInTheDocument()
    expect(buttonSmallElement).toHaveStyle('font-size: 12px')
    expect(buttonSmallElement).toHaveStyle('background-color: transparent')
    expect(buttonSmallElement).toHaveStyle('color: #000')
  })

  it('renders the ButtonSmall with custom styles', () => {
    render(
      <ButtonSmall $bgcolor="#f00" $color="#fff">
        Custom Small Button
      </ButtonSmall>,
    )
    const buttonSmallElement = screen.getByText('Custom Small Button')

    expect(buttonSmallElement).toBeInTheDocument()
    expect(buttonSmallElement).toHaveStyle('background-color: #f00')
    expect(buttonSmallElement).toHaveStyle('color: #fff')
  })
})
