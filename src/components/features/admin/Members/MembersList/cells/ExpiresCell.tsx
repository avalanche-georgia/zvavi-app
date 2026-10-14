import { useListDates } from '@components/features/admin/shared'
import { useNow, useTranslations } from 'next-intl'

import { isMembershipOver } from '../../shared'

import { cn } from '@/lib/utils'

type ExpiresCellProps = {
  expiresAt: string | null
  // Card layout: one line, "Expires 04 Oct 2026"
  isInline?: boolean
}

// The membership's last day; flagged once it has passed
const ExpiresCell = ({ expiresAt, isInline = false }: ExpiresCellProps) => {
  const t = useTranslations()
  const now = useNow()
  const { formatDate } = useListDates()

  if (!expiresAt) {
    return (
      <span className={cn('text-muted', isInline && 'text-caption')}>
        {t('admin.members.form.placeholders.expiresAt')}
      </span>
    )
  }

  const isOver = isMembershipOver(expiresAt, now)
  const date = formatDate(expiresAt)

  if (isInline) {
    return (
      <span className={cn('text-caption tabular-nums', isOver ? 'text-danger' : 'text-muted')}>
        {t(isOver ? 'admin.members.list.expiredOn' : 'admin.members.list.expiresOn', { date })}
      </span>
    )
  }

  return (
    <div className="flex flex-col tabular-nums">
      <span className={cn('font-medium', isOver && 'text-danger')}>{date}</span>
      {isOver && (
        <span className="text-caption text-danger">{t('admin.members.list.overdue')}</span>
      )}
    </div>
  )
}

export default ExpiresCell
