import { ForwardedRef, forwardRef } from 'react'
import InputMasked, { MaskedInputProps } from 'react-text-mask'
import { InputWrapper } from '~/components/Form/TextField/styles'

interface Props extends MaskedInputProps {
  error?: string
  label?: string
}

function MaskedInputComponent(
  { mask, error, label, ...rest }: Props,
  ref: ForwardedRef<InputMasked>,
) {
  return (
    <InputWrapper>
      <label htmlFor={rest.id}>{label}</label>
      <InputMasked mask={mask} {...rest} ref={ref} />
      {error && <span>{error}</span>}
    </InputWrapper>
  )
}

export const MaskedInput = forwardRef(MaskedInputComponent)
