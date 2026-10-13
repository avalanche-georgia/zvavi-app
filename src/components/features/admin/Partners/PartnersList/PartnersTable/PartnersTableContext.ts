import { createContext, useContext } from 'react'

type PartnersTableContextValue = {
  onPartnerOpen: (id: string) => void
}

// Values the cells need while the columns stay module-level (stable cell components)
export const PartnersTableContext = createContext<PartnersTableContextValue | null>(null)

export const usePartnersTable = () => {
  const value = useContext(PartnersTableContext)

  if (!value) throw new Error('usePartnersTable must be used inside PartnersTableContext')

  return value
}
