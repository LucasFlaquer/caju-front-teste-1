import { Bounce, toast } from 'react-toastify'

export function useToast() {
  function notifySuccess(message: string) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })
  }

  function notifyError(message: string) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: 'light',
      transition: Bounce,
    })
  }

  return { notifySuccess, notifyError }
}
