'use client'

import { useEffect } from 'react'
import { regionLocalStorageKey } from '@domain/constants'
import type { Region } from '@domain/types'

import RegionContext from './RegionContext'

type RegionProviderProps = {
  region: Region
  regions: Region[]
  children: React.ReactNode
}

const RegionProvider = ({ children, region, regions }: RegionProviderProps) => {
  useEffect(() => {
    localStorage.setItem(regionLocalStorageKey, region.id)
    document.cookie = `${regionLocalStorageKey}=${region.id}; path=/; max-age=31536000; SameSite=Lax`
  }, [region.id])

  return <RegionContext.Provider value={{ region, regions }}>{children}</RegionContext.Provider>
}

export default RegionProvider
