import * as S from './styles'

import { ReturnButton } from '~/pages/NewUser/components/ReturnButton'
import { RegisterForm } from '~/pages/NewUser/components/RegisterForm'

function NewUserPage() {
  return (
    <S.Container>
      <S.Card>
        <ReturnButton />
        <RegisterForm />
      </S.Card>
    </S.Container>
  )
}

export default NewUserPage
