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
      <h2 className="text-muted mb-1 text-[13px] font-semibold tracking-[.05em] uppercase">
        {t('observations.pendingOwn.title')}
      </h2>
      <p className="text-muted mb-2.5 text-sm">{t('observations.pendingOwn.note')}</p>
      <ul className="flex flex-col gap-2">
        {reports.map(({ createdAt, id, size, type }) => (
          <li
            key={id}
            className="border-rule grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-dashed bg-white p-3"
          >
            <SizeTile size={size} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 text-[15.5px] font-semibold">
                {t(`common.avalancheTypes.${type}`)}
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                  {t('common.avalancheStatuses.pending')}
                </span>
              </div>
              <div className="text-muted text-sm">
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
