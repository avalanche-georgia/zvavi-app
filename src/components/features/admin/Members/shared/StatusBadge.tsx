import type { MemberStatus } from '@domain/types'
import { StatusPill, type StatusPillTone } from '@ds/primitives'
import { useTranslations } from 'next-intl'

const statusTones: Record<MemberStatus, StatusPillTone> = {
  active: 'success',
  expired: 'danger',
  inactive: 'neutral',
  pending: 'accent',
  suspended: 'warning',
}

const StatusBadge = ({ status }: { status: MemberStatus }) => {
  const t = useTranslations()

  return <StatusPill tone={statusTones[status]}>{t(`admin.members.statuses.${status}`)}</StatusPill>
}

export default StatusBadge
