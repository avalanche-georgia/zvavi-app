'use client'

import { LinkPendingIndicator } from '@components/features/admin/shared'
import { Skeleton } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

type MetricCardProps = {
  // Where the number comes from — the tile opens that list
  href: string
  isError: boolean
  isPending: boolean
  label: string
  // Muted text after the number, e.g. "of 2 regions"
  note?: string
  value: number
}

const MetricCard = ({ href, isError, isPending, label, note, value }: MetricCardProps) => {
  const t = useTranslations()

  const renderValue = () => {
    if (isPending) return <Skeleton className="h-8 w-10" />

    // A failed fetch must not read as a real zero
    if (isError) {
      return (
        <span className="text-title text-placeholder font-semibold">
          <span aria-hidden>—</span>
          <span className="sr-only">{t('admin.dashboard.metrics.loadError')}</span>
        </span>
      )
    }

    return (
      <span className="flex items-baseline gap-1.5">
        <span className="text-title text-ink font-semibold tabular-nums">{value}</span>
        {note && <span className="text-copy-sm text-muted">{note}</span>}
      </span>
    )
  }

  return (
    <Link
      className="rounded-card border-rule bg-surface hover:border-rule-strong focus-ring flex flex-col gap-1.5 border px-4 py-3.5 transition-colors"
      href={href}
    >
      <span className="text-caption text-muted font-semibold tracking-wider uppercase">
        {label}
        <LinkPendingIndicator />
      </span>
      {renderValue()}
    </Link>
  )
}

export default MetricCard
