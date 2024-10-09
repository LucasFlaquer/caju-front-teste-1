import {
  createContext,
  ReactNode,
  useCallback,
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
  isLoading: boolean
  updateStatus: (id: string, status: RegistrationStatus) => Promise<void>
  removeRegistration: (id: string) => Promise<void>
  refreshList: () => Promise<void>
  fetchByCPF: (cpf: string) => Promise<void>
}

const RegistrationContext = createContext({} as RegistrationsContextProps)

export function RegistrationContextProvider({ children }: ProviderProps) {
  const { notifySuccess, notifyError } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])

  async function updateStatus(id: string, status: RegistrationStatus) {
    try {
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

      notifySuccess('Registro atualizado com sucesso')
    } catch (error) {
      notifyError('Erro ao alterar o status')
    } finally {
      setIsLoading(false)
    }
  }

  async function removeRegistration(id: string) {
    try {
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
    } catch (error) {
      notifyError('Erro ao remover registro')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchByCPF = useCallback(async (cpf: string) => {
    try {
      setIsLoading(true)
      const response = await api.get(
        `/registrations?cpf=${cpf.replace(/\D/g, '')}`,
      )
      setRegistrations(response.data)
      setIsLoading(false)
    } catch (error) {
      notifyError('Erro ao buscar por CPF')
    } finally {
      setIsLoading(false)
    }
  }, [])

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
        fetchByCPF,
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
