import { useTranslations } from 'next-intl'

import type { AvalancheTableVariant } from './types'

import { cn } from '@/lib/utils'

type Column = { className: string; label: string }

const TableHeader = ({ variant }: { variant: AvalancheTableVariant }) => {
  const t = useTranslations()

  const columns: Column[] =
    variant === 'queue'
      ? [
          { className: 'w-36', label: t('admin.observations.queue.columns.submitted') },
          { className: 'w-28', label: t('admin.recentAvalanches.list.columns.date') },
          { className: 'w-36', label: t('admin.recentAvalanches.list.columns.type') },
          { className: 'w-14 text-center', label: t('admin.recentAvalanches.list.columns.size') },
          { className: 'min-w-0 flex-1', label: t('admin.observations.queue.columns.submitter') },
        ]
      : [
          { className: 'w-28', label: t('admin.recentAvalanches.list.columns.date') },
          { className: 'w-36', label: t('admin.recentAvalanches.list.columns.type') },
          { className: 'w-14 text-center', label: t('admin.recentAvalanches.list.columns.size') },
          { className: 'w-24', label: t('admin.recentAvalanches.list.columns.source') },
          { className: 'min-w-0 flex-1', label: t('admin.recentAvalanches.list.columns.status') },
        ]

  return (
    <header className="flex w-full items-center gap-5 border-b bg-gray-100 px-4 py-1.5">
      {columns.map(({ className, label }) => (
        <div key={label} className={cn('shrink-0 text-sm font-semibold', className)}>
          {label}
        </div>
      ))}
      <div className="w-28 shrink-0 text-right text-sm font-semibold">
        {t('admin.recentAvalanches.list.columns.actions')}
      </div>
    </header>
  )
}

export default TableHeader
