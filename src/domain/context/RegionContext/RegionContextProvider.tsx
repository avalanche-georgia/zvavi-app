'use client'

import { useEffect } from 'react'
import { regionLocalStorageKey } from '@domain/constants'
import type { Region } from '@domain/types'
import { useParams } from 'next/navigation'

import RegionContext from './RegionContext'

type RegionContextProviderProps = {
  children: React.ReactNode
  region: Region | null
  regions: Region[]
}

const RegionContextProvider = ({
  children,
  region: serverRegion,
  regions,
}: RegionContextProviderProps) => {
  const params = useParams()
  const urlRegionId = params?.region as string | undefined
  const region = urlRegionId
    ? (regions.find((r) => r.id === urlRegionId) ?? serverRegion)
    : serverRegion
  const regionId = region?.id

  useEffect(() => {
    if (!regionId) return
    document.cookie = `${regionLocalStorageKey}=${regionId}; path=/; max-age=31536000; SameSite=Lax`
  }, [regionId])

  return <RegionContext.Provider value={{ region, regions }}>{children}</RegionContext.Provider>
}

export default RegionContextProvider
