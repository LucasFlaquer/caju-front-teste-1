import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '~/api'
import { useToast } from '~/hooks/useToast'
import { Registration, RegistrationStatus } from '~/interfaces/registrations'

interface ProviderProps {
  children: ReactNode
}

interface RegistrationsContextProps {
  registrations: Registration[]
  updateStatus: (id: string, status: RegistrationStatus) => Promise<void>
  removeRegistration: (id: string) => Promise<void>
  refreshList: () => Promise<void>
  isLoading: boolean
}

const RegistrationContext = createContext({} as RegistrationsContextProps)

export function RegistrationContextProvider({ children }: ProviderProps) {
  const { notifySuccess } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])

  async function updateStatus(id: string, status: RegistrationStatus) {
    setIsLoading(true)
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
    setIsLoading(false)
    notifySuccess('Registro atualizado com sucesso')
  }

  async function removeRegistration(id: string) {
    setIsLoading(true)
    const registrationToUpdate = registrations.find(
      (registration) => registration.id === id,
    )
    if (!registrationToUpdate) return
    await api.delete(`/registrations/${registrationToUpdate.id}`)
    const registrationsUpdated = registrations.filter(
      (registration) => registration.id !== id,
    )
    setRegistrations(registrationsUpdated)
    setIsLoading(false)
    notifySuccess('Registro removido com sucesso')
  }

  async function fetchRegistrations() {
    setIsLoading(true)
    const response = await api.get('/registrations')
    setRegistrations(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])
  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        updateStatus,
        removeRegistration,
        refreshList: fetchRegistrations,
        isLoading,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationContext)
}
