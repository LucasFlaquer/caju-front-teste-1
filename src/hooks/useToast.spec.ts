import { renderHook } from '@testing-library/react'
import { toast } from 'react-toastify'
import { useToast } from './useToast'

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Bounce: jest.fn(),
}))

describe('useToast hook', () => {
  it('should call toast.success with correct options', () => {
    const { result } = renderHook(() => useToast())
    result.current.notifySuccess('Success message')
    expect(toast.success).toHaveBeenCalledWith('Success message', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: expect.any(Function),
    })
  })
  it('should call toast.error with correct options', () => {
    const { result } = renderHook(() => useToast())
    result.current.notifyError('Error message')
    expect(toast.error).toHaveBeenCalledWith('Error message', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: expect.any(Function),
    })
  })
})
