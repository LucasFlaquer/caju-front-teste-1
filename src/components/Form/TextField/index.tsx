import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import { InputWrapper } from './styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
}

export const TextField = forwardRef(function DefaultInput(
  { error, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <InputWrapper>
      <label htmlFor={rest.id}>{rest.label}</label>
      <input {...rest} ref={ref} />
      {error && <span>{error}</span>}
    </InputWrapper>
  )
})
