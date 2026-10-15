'use client'

import type { Region } from '@domain/types'
import { useParams } from 'next/navigation'

import RegionContext from './RegionContext'

type RegionContextProviderProps = {
  children: React.ReactNode
  region: Region | null
  regions: Region[]
}

// The region the page is about: the URL's on region pages, else the one passed in
// (remembered or the only one). Never writes the cookie — only an explicit choice
// on the region chooser does (rememberRegion).
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

  return <RegionContext.Provider value={{ region, regions }}>{children}</RegionContext.Provider>
}

export default RegionContextProvider
