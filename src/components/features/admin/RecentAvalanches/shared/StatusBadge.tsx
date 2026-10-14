import type { AvalancheStatus } from '@domain/types'
import { StatusPill, type StatusPillTone } from '@ds/primitives'
import { useTranslations } from 'next-intl'

const statusTones: Record<AvalancheStatus, StatusPillTone> = {
  archived: 'neutral',
  draft: 'warning',
  pending: 'accent',
  published: 'success',
}

const StatusBadge = ({ status }: { status: AvalancheStatus }) => {
  const t = useTranslations()

  return (
    <StatusPill tone={statusTones[status]}>{t(`common.avalancheStatuses.${status}`)}</StatusPill>
  )
}

export default StatusBadge
