import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { api } from '~/api'
import { RegisterForm } from '~/pages/NewUser/components/RegisterForm'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))
jest.mock('~/hooks/useToast', () => ({
  useToast: () => ({
    notifyError: jest.fn(),
  }),
}))
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))

describe('<RegisterForm />', () => {
  let user: UserEvent
  let spyedApiPost: jest.SpyInstance

  beforeAll(() => {
    user = userEvent.setup()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    spyedApiPost = jest.spyOn(api, 'post').mockResolvedValue({})
  })

  it('should be able to render properly', () => {
    render(<RegisterForm />)
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('CPF')).toBeInTheDocument()
    expect(screen.getByLabelText('Data de admissão')).toBeInTheDocument()
  })
  it('should be able to validate the empty fields on form', async () => {
    render(<RegisterForm />)
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
    await user.click(submitButton)
    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(4)
  })
  it('should be able to validate Name field', async () => {
    render(<RegisterForm />)
    const nameField = screen.getByLabelText('Nome')
    await user.type(nameField, 'l')
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
    await user.click(submitButton)
    expect(
      screen.getByText('O nome deve conter pelo menos duas letras'),
    ).toBeInTheDocument()
    await user.type(nameField, 'u')
    expect(
      screen.getByText(
        'O nome deve conter pelo menos um espaço entre o nome e sobrenome',
      ),
    ).toBeInTheDocument()
    await user.clear(nameField)
    await user.type(nameField, '1')
    expect(
      screen.getByText('O nome não pode começar com um número'),
    ).toBeInTheDocument()
  })
  it('should be able to validate EmailField', async () => {
    render(<RegisterForm />)
    const emailField = screen.getByLabelText('Email')
    await user.type(emailField, '@clearout.io')
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
    await user.click(submitButton)
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })
  it('should be able to validate CPF field', async () => {
    render(<RegisterForm />)
    const cpfField = screen.getByLabelText('CPF')
    await user.type(cpfField, '42329238212')
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
    await user.click(submitButton)
    expect(screen.getByText('CPF inválido')).toBeInTheDocument()
  })
  it('submits the form successfully and navigates to dashboard', async () => {
    render(<RegisterForm />)
    const nameField = screen.getByLabelText('Nome')
    await user.type(nameField, 'jhonn doe')
    const emailField = screen.getByLabelText('Email')
    await user.type(emailField, 'john@doe.com')
    const cpfField = screen.getByLabelText('CPF')
    await user.type(cpfField, '42831345898')
    fireEvent.input(screen.getByLabelText(/Data de admissão/i), {
      target: { value: '2023-10-01' },
    })
    const submitButton = screen.getByRole('button', { name: 'Cadastrar' })
    await user.click(submitButton)
    await waitFor(() => {
      expect(spyedApiPost).toHaveBeenCalledWith('/registrations', {
        admissionDate: '01/10/2023',
        email: 'john@doe.com',
        employeeName: 'jhonn doe',
        status: 'REVIEW',
        cpf: '42831345898',
      })
    })
  })
})
