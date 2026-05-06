'use client'

import { ForecastsList } from '@components/features/admin/Forecasts/ForecastsList'
import { Icon } from '@components/icons'
import { ButtonLink, RegionTabs } from '@components/shared'
import { Spinner } from '@components/ui'
import { useForecastsQuery } from '@data/hooks'
import { defaultRegionId } from '@domain/constants'
import type { Region, RegionId } from '@domain/types'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

type ForecastsContainerProps = {
  initialRegions?: Region[]
}

const ForecastsContainer = ({ initialRegions }: ForecastsContainerProps) => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const regionId = (searchParams.get('regionId') as RegionId) ?? defaultRegionId

  // TODO(PR 3): replace with regionId from admin route/context
  const { data: forecasts, isPending } = useForecastsQuery(regionId)

  return (
    <>
      <div className="flex items-center border-b bg-white px-4 md:px-6">
        <RegionTabs currentRegionId={regionId} initialRegions={initialRegions} />
      </div>

      <div className="flex items-center justify-end gap-4 border-b bg-white px-4 py-3 md:px-6">
        <ButtonLink href={routes.admin.forecasts.newInRegion(regionId)}>
          <Icon icon="plus" size="sm" />
          {t('admin.forecast.title.create')}
        </ButtonLink>
      </div>

      <div className="p-4 md:p-6">
        {isPending ? (
          <div className="flex items-center justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <ForecastsList forecasts={forecasts ?? []} />
        )}
      </div>
    </>
  )
}

export default ForecastsContainer
