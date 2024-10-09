import styled from 'styled-components'

export type StatusKeys = 'REVIEW' | 'APPROVED' | 'REPROVED'

const registrationStatusStyles: {
  [key in string]: { background: string; title: string }
} = {
  REVIEW: {
    background: '#FDF8E9',
    title: '#EFC24D',
  },
  APPROVED: {
    background: '#EEEEFD',
    title: '#4242DF',
  },
  REPROVED: {
    background: '#FBEDF6',
    title: '#CE2893',
  },
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

interface StatusProps {
  $status: StatusKeys
}

export const Column = styled.div<StatusProps>`
  height: auto;
  background-color: ${({ $status }) =>
    registrationStatusStyles[$status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;

  @media (max-width: 768px) {
    min-height: 60vh;
    max-height: 60vh;
  }
`

export const TitleColumn = styled.h3<StatusProps>`
  margin: 0px;
  color: ${({ $status }) => registrationStatusStyles[$status].title};
  margin: 24px;
`

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`
