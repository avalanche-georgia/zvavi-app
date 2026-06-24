'use client'

import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'

import RegionRow from './RegionRow'

type RegionForecastStatusProps = { regions: Region[] }

const RegionForecastStatus = ({ regions }: RegionForecastStatusProps) => {
  const t = useTranslations()

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-4">
      <p className="mb-3 text-sm font-semibold text-gray-900">
        {t('admin.dashboard.regions.title')}
      </p>
      {regions.map((region) => (
        <RegionRow key={region.id} regionId={region.id} />
      ))}
    </div>
  )
}

export default RegionForecastStatus
