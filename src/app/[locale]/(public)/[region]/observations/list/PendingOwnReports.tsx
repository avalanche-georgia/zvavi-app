import { SizeTile, useRelativeDate } from '@components/features/observations'
import { useTranslations } from 'next-intl'

import type { PendingOwnReport } from '../helpers/pendingOwnReports'

// The submitter's own reports, visible only to them until a moderator approves
const PendingOwnReports = ({ reports }: { reports: PendingOwnReport[] }) => {
  const t = useTranslations()
  const formatRelativeDate = useRelativeDate()

  if (reports.length === 0) return null

  return (
    <section className="mb-4">
      <h2 className="text-muted text-copy-sm tracking-eyebrow mb-1 font-semibold uppercase">
        {t('observations.pendingOwn.title')}
      </h2>
      <p className="text-muted text-copy mb-2.5">{t('observations.pendingOwn.note')}</p>
      <ul className="flex flex-col gap-2">
        {reports.map(({ createdAt, id, size, type }) => (
          <li
            key={id}
            className="border-rule rounded-card bg-surface grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 border border-dashed p-3"
          >
            <SizeTile size={size} />
            <div className="min-w-0">
              <div className="text-copy-lg flex flex-wrap items-center gap-1.5 font-semibold">
                {t(`common.avalancheTypes.${type}`)}
                <span className="bg-warning-soft text-warning text-caption rounded-full px-2 py-0.5 font-medium">
                  {t('common.avalancheStatuses.pending')}
                </span>
              </div>
              <div className="text-muted text-copy">
                {t('observations.pendingOwn.submitted', {
                  date: formatRelativeDate(createdAt),
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PendingOwnReports
