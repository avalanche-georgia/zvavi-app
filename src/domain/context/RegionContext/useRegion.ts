'use client'

import { useContext } from 'react'

import RegionContext, { type RegionContextType } from './RegionContext'

const useRegion = (): RegionContextType => {
  const context = useContext(RegionContext)

  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider')
  }

  return context
}

export default useRegion
