'use client'

import { Icon } from '@components/icons'
import { dateFormat } from '@domain/constants'
import type { MemberStatus } from '@domain/types'
import { format, parseISO } from 'date-fns'
import { useTranslations } from 'next-intl'

import { statusConfig } from './statusConfig'

import { cn } from '@/lib/utils'

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

  const formattedJoinedAt = format(parseISO(joinedAt), dateFormat)
  const formattedExpiresAt = expiresAt ? format(parseISO(expiresAt), dateFormat) : null

  return (
    <div className="rounded-card bg-surface shadow-menu w-full max-w-md overflow-hidden">
      <div className={cn('p-6 text-center', config.header.bg)}>
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-white/20 p-3">
            <Icon className="text-white" icon={config.icon} size="lg" />
          </div>
        </div>
        <h1 className="text-title font-bold text-white">{fullName}</h1>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span
            className={cn(
              'text-copy rounded-full px-4 py-1 font-medium',
              config.badge.bg,
              config.badge.text,
            )}
          >
            {statusLabel}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted">{t('verify.card.memberId')}</span>
            <span className="font-mono font-medium">{memberId}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted">{t('verify.card.memberSince')}</span>
            <span className="font-medium">{formattedJoinedAt}</span>
          </div>

          {formattedExpiresAt && (
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-muted">{t('verify.card.expiresAt')}</span>
              <span className={cn('font-medium', status === 'expired' && 'text-danger')}>
                {formattedExpiresAt}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-canvas px-6 py-4 text-center">
        <p className="text-caption text-muted">{t('verify.card.verifiedBy.label')}</p>
        <p className="text-body font-medium">{t('verify.card.verifiedBy.value')}</p>
      </div>
    </div>
  )
}

export default MemberCard
