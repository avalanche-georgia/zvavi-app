'use client'

import { AdminPageBody } from '@components/layout/admin'
import type { Region } from '@domain/types'

import MetricCards from './MetricCards'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'
import { RegionForecastStatus } from './RegionForecastStatus'

const AdminDashboard = ({ initialRegions }: { initialRegions: Region[] }) => (
  <AdminPageBody>
    <MetricCards regions={initialRegions} />

    <div className="grid items-start gap-4 @4xl:grid-cols-[1.7fr_1fr]">
      <RegionForecastStatus regions={initialRegions} />

      <div className="flex flex-col gap-4">
        <QuickActions regions={initialRegions} />
        <RecentActivity regions={initialRegions} />
      </div>
    </div>
  </AdminPageBody>
)

export default AdminDashboard
