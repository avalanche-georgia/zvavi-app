'use client'

import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'

import RegionRow from './RegionRow'
import DashboardCard from '../DashboardCard'

const RegionForecastStatus = ({ regions }: { regions: Region[] }) => {
  const t = useTranslations()

  return (
    <DashboardCard title={t('admin.dashboard.regions.title')}>
      <ul className="-my-2">
        {regions.map((region) => (
          <RegionRow key={region.id} regionId={region.id} />
        ))}
      </ul>
    </DashboardCard>
  )
}

export default RegionForecastStatus
