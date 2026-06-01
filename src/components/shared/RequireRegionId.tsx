'use client'

import { useEffect } from 'react'
import { Spinner } from '@components/ui'
import type { RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

type RequireRegionIdProps = {
  children: (regionId: RegionId) => React.ReactNode
  fallbackRoute: string
}

const RequireRegionId = ({ children, fallbackRoute }: RequireRegionIdProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const regionId = searchParams.get('regionId') as RegionId | null

  useEffect(() => {
    if (!regionId) {
      router.replace(fallbackRoute)
    }
  }, [fallbackRoute, regionId, router])

  if (!regionId) {
    return <Spinner />
  }

  return children(regionId)
}

export default RequireRegionId
