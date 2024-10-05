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
  removeRegistration: (id: string) => Promise<void>
}

const RegistrationContext = createContext({} as RegistrationsContextProps)

export function RegistrationContextProvider({ children }: ProviderProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([])

  async function updateStatus(id: string, status: RegistrationStatus) {
    const registrationToUpdate = registrations.find(
      (registration) => registration.id === id,
    )
    if (!registrationToUpdate) return
    await api.put(`/registrations/${registrationToUpdate.id}`, {
      ...registrationToUpdate,
      status,
    })
    const registrationsUpdated = registrations.map((registration) => {
      if (registration.id !== registrationToUpdate.id) return registration
      return { ...registration, status }
    })
    setRegistrations(registrationsUpdated)
  }

  async function removeRegistration(id: string) {
    const registrationToUpdate = registrations.find(
      (registration) => registration.id === id,
    )
    if (!registrationToUpdate) return
    await api.delete(`/registrations/${registrationToUpdate.id}`)
    const registrationsUpdated = registrations.filter(
      (registration) => registration.id !== id,
    )
    setRegistrations(registrationsUpdated)
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
        removeRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationContext)
}
