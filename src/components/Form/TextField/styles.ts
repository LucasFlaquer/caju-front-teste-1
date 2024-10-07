import styled from 'styled-components'

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 0.8rem;

  input {
    padding: 0 8px;
    vertical-align: middle;
    border-radius: 2px;
    width: 100%;
    min-height: 36px;
    background-color: #ffffff;
    border: 1px solid rgba(36, 28, 21, 0.3);
    transition: all 0.2s ease-in-out 0s;
    font-size: 16px;
    line-height: 18px;
    font-weight: normal;
    border-radius: 8px;
    :focus {
      outline: none;
      border: 1px solid #007c89;
      box-shadow: inset 0 0 0 1px #007c89;
    }
  }
  span {
    position: absolute;
    left: 0;
    bottom: -1.2rem;
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 12px;
    font-weight: 700;
    color: rgba(232, 5, 55, 1);
  }
`
