'use client'

import type { Region } from '@domain/types'
import { useTranslations } from 'next-intl'

import MetricCards from './MetricCards'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'
import { RegionForecastStatus } from './RegionForecastStatus'

const AdminDashboard = ({ initialRegions }: { initialRegions: Region[] }) => {
  const t = useTranslations()

  return (
    <div className="p-4 md:p-6">
      <p className="mb-5 text-xl font-semibold text-gray-900">{t('admin.dashboard.title')}</p>

      <MetricCards regions={initialRegions} />

      <div className="mt-3.5 grid grid-cols-[1.7fr_1fr] gap-3.5">
        <RegionForecastStatus regions={initialRegions} />

        <div className="flex flex-col gap-3">
          <QuickActions regions={initialRegions} />
          <RecentActivity regions={initialRegions} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
