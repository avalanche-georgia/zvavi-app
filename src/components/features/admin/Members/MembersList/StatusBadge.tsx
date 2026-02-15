import type { MemberStatus } from '@domain/types'
import clsx from 'clsx'

type StatusBadgeProps = {
  status: MemberStatus
}

const statusStyles: Record<MemberStatus, string> = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-blue-100 text-blue-800',
  suspended: 'bg-amber-100 text-amber-800',
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={clsx(
      'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
      statusStyles[status],
    )}
  >
    {status}
  </span>
)

export default StatusBadge
