import { createContext, useContext } from 'react'
import type { RegionId } from '@domain/types'

import type { OnAvalancheOpen } from '../types'

type AvalanchesTableContextValue = {
  onAvalancheOpen: OnAvalancheOpen
  regionId: RegionId
}

// Values the cells need while the columns stay module-level (stable cell components)
export const AvalanchesTableContext = createContext<AvalanchesTableContextValue | null>(null)

export const useAvalanchesTable = () => {
  const value = useContext(AvalanchesTableContext)

  if (!value) throw new Error('useAvalanchesTable must be used inside AvalanchesTableContext')

  return value
}
