import Router from '~/router'
import { Header } from '~/components/Header'
import { RegistrationContextProvider } from '~/context/registrations-context'

function App() {
  return (
    <RegistrationContextProvider>
      <Header />
      <Router />
    </RegistrationContextProvider>
  )
}

export default App
