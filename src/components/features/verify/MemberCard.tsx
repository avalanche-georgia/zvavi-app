'use client'

import { Icon } from '@components/icons'
import { dateFormat } from '@domain/constants'
import type { MemberStatus } from '@domain/types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useTranslations } from 'next-intl'

import { statusConfig } from './statusConfig'

type MemberCardProps = {
  expiresAt: string | null
  firstName: string
  joinedAt: string
  lastName: string
  memberId: string
  status: MemberStatus
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
  const config = statusConfig[status]

  const formattedJoinedAt = format(new Date(joinedAt), dateFormat)
  const formattedExpiresAt = expiresAt ? format(new Date(expiresAt), dateFormat) : null

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className={clsx('p-6 text-center', config.header.bg)}>
        <div className="mb-2 flex justify-center">
          <div className={clsx('rounded-full p-3', config.header.iconBg)}>
            <Icon className="text-white" icon={config.icon} size="lg" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white">{fullName}</h1>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span
            className={clsx(
              'rounded-full px-4 py-1 text-sm font-medium',
              config.badge.bg,
              config.badge.text,
            )}
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
        <p className="text-xs text-gray-500">{t('verify.card.verifiedBy.label')}</p>
        <p className="font-medium text-gray-700">{t('verify.card.verifiedBy.value')}</p>
      </div>
    </div>
  )
}

export default MemberCard
