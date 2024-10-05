import Router from '~/router'
import { Header } from '~/components/Header'
import { RegistrationContextProvider } from '~/context/registrations-context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <RegistrationContextProvider>
      <Header />
      <Router />
      <ToastContainer />
    </RegistrationContextProvider>
  )
}

export default App
