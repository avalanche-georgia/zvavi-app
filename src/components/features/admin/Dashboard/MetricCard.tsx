'use client'

import { Skeleton } from '@components/ui'
import { useTranslations } from 'next-intl'

type MetricCardProps = {
  children: React.ReactNode
  isError: boolean
  isPending: boolean
  label: string
}

const MetricCard = ({ children, isError, isPending, label }: MetricCardProps) => {
  const t = useTranslations()

  const renderValue = () => {
    if (isPending) return <Skeleton className="h-8 w-10" />

    // A failed fetch must not read as a real zero
    if (isError) {
      return (
        <span
          className="text-2xl font-semibold text-gray-400"
          title={t('admin.dashboard.metrics.loadError')}
        >
          —<span className="sr-only">{t('admin.dashboard.metrics.loadError')}</span>
        </span>
      )
    }

    return children
  }

  return (
    <div className="rounded-lg border bg-gray-100 px-4 py-3.5">
      <p className="mb-1.5 text-xs tracking-wide text-gray-500 uppercase">{label}</p>
      {renderValue()}
    </div>
  )
}

export default MetricCard
