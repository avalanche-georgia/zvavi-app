'use client'

import { Icon } from '@components/icons'
import type { MemberStatus } from '@domain/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

type MemberCardProps = {
  expiresAt: string | null
  firstName: string
  joinedAt: string
  lastName: string
  memberId: string
  status: MemberStatus
}

const statusStyles: Record<MemberStatus, { bg: string; icon: string; text: string }> = {
  active: { bg: 'bg-green-100', icon: 'text-green-600', text: 'text-green-800' },
  expired: { bg: 'bg-red-100', icon: 'text-red-600', text: 'text-red-800' },
  inactive: { bg: 'bg-gray-100', icon: 'text-gray-600', text: 'text-gray-800' },
  suspended: { bg: 'bg-yellow-100', icon: 'text-yellow-600', text: 'text-yellow-800' },
}

const MemberCard = ({
  expiresAt,
  firstName,
  joinedAt,
  lastName,
  memberId,
  status,
}: MemberCardProps) => {
  const t = useTranslations()

  const fullName = `${firstName} ${lastName}`
  const statusLabel = t(`verify.statuses.${status}`)
  const styles = statusStyles[status]

  const formattedJoinedAt = format(new Date(joinedAt), 'dd/MM/yyyy')
  const formattedExpiresAt = expiresAt ? format(new Date(expiresAt), 'dd/MM/yyyy') : null

  const isActive = status === 'active'

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className={clsx('p-6 text-center', isActive ? 'bg-green-500' : 'bg-gray-500')}>
        <div className="mb-2 flex justify-center">
          <div className={clsx('rounded-full p-3', isActive ? 'bg-green-400' : 'bg-gray-400')}>
            <Icon className="text-white" icon="check" size="lg" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">{fullName}</h1>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span
            className={clsx('rounded-full px-4 py-1 text-sm font-medium', styles.bg, styles.text)}
          >
            {statusLabel}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">{t('verify.card.memberId')}</span>
            <span className="font-mono font-medium">{memberId}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-gray-500">{t('verify.card.memberSince')}</span>
            <span className="font-medium">{formattedJoinedAt}</span>
          </div>

          {formattedExpiresAt && (
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-gray-500">{t('verify.card.expiresAt')}</span>
              <span className={clsx('font-medium', status === 'expired' && 'text-red-600')}>
                {formattedExpiresAt}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 text-center">
        <p className="text-xs text-gray-500">{t('verify.card.verifiedBy')}</p>
        <p className="font-medium text-gray-700">Georgian Avalanche Association</p>
      </div>
    </div>
  )
}

export default MemberCard
