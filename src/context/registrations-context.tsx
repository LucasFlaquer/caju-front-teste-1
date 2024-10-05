import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '~/api'
import { Registration, RegistrationStatus } from '~/interfaces/registrations'

interface ProviderProps {
  children: ReactNode
}

interface RegistrationsContextProps {
  registrations: Registration[]
  updateStatus: (id: string, status: RegistrationStatus) => Promise<void>
}

const RegistrationContext = createContext({} as RegistrationsContextProps)

export function RegistrationContextProvider({ children }: ProviderProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  async function updateStatus(id: string, status: RegistrationStatus) {
    const registration = registrations.find(
      (registration) => registration.id === id,
    )
    if (!registration) return
    await api.put(`/registrations/${registration.id}`, {
      ...registration,
      status,
    })
  }

  async function fetchInitialData() {
    const response = await api.get('/registrations')
    setRegistrations(response.data)
  }

  useEffect(() => {
    fetchInitialData()
  }, [])
  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        updateStatus,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationContext)
}
