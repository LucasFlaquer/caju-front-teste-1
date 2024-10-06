import { Bounce, toast, ToastOptions } from 'react-toastify'

const TOAST_OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Bounce,
}

export function useToast() {
  function notifySuccess(message: string) {
    toast.success(message, TOAST_OPTIONS)
  }

  function notifyError(message: string) {
    toast.error(message, TOAST_OPTIONS)
  }

  return { notifySuccess, notifyError }
}
