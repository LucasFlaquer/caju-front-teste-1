import styled from 'styled-components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const OverlayLoaderContainer = styled.div`
  z-index: 90;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`

export const LoadingIcon = styled(AiOutlineLoading3Quarters).attrs({
  size: 36,
  color: 'rgb(255, 117, 0)',
})`
  animation: rotate 0.8s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
