import styled from 'styled-components'

interface ButtonProps {
  $variant?: 'default' | 'cancel'
}

const Button = styled.button<ButtonProps>`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 36px;
  padding: 8px 32px;
  background-color: ${(props) =>
    props.$variant === 'default' ? '#64a98c' : 'rgba(232, 5, 55, 1)'};
  cursor: pointer;
  height: 56px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
`

Button.defaultProps = {
  $variant: 'default',
}

type ButtonSmallProps = {
  $bgcolor?: string
  $color?: string
}

export const ButtonSmall = styled.button<ButtonSmallProps>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.$bgcolor ?? 'none'};
  color: ${(props) => props.$color ?? '#000'};
  cursor: pointer;
`

export default Button
