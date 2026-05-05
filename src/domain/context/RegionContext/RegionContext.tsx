'use client'

import { createContext } from 'react'
import type { Region } from '@domain/types'

export type RegionContextType = {
  region: Region
  regions: Region[]
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export default RegionContext
