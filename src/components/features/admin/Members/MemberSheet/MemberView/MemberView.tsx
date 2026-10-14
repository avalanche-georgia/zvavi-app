'use client'

import { useListDates } from '@components/features/admin/shared'
import { DetailSection, type Fact, FactsGrid } from '@components/features/observations'
import type { Member } from '@domain/types'
import { useNow, useTranslations } from 'next-intl'

import QRCodeSection from './QRCodeSection'
import { isMembershipOver, StatusBadge } from '../../shared'

const emptyValue = '—'

// Read-only member: status, contact and membership facts, notes, QR code
const MemberView = ({ member }: { member: Member }) => {
  const t = useTranslations()
  const now = useNow()
  const { formatDate } = useListDates()
  const { createdAt, email, expiresAt, joinedAt, memberId, notes, phone, status } = member
  const labelKey = 'admin.members.form.labels'

  const facts: Fact[] = [
    {
      label: t(`${labelKey}.email`),
      value: <span className="break-all">{email || emptyValue}</span>,
    },
    { label: t(`${labelKey}.phone`), value: phone || emptyValue },
    { label: t(`${labelKey}.joinedAt`), value: formatDate(joinedAt) },
    {
      label: t(`${labelKey}.expiresAt`),
      value: (
        <span className={isMembershipOver(expiresAt, now) ? 'text-danger' : undefined}>
          {expiresAt ? formatDate(expiresAt) : t('admin.members.form.placeholders.expiresAt')}
        </span>
      ),
    },
    { label: t('admin.members.view.registeredAt'), value: formatDate(createdAt) },
    { label: t(`${labelKey}.memberId`), value: <span className="font-mono">{memberId}</span> },
  ]

  return (
    <div className="pb-8">
      <div className="px-4 pt-4">
        <StatusBadge status={status} />
      </div>
      <FactsGrid facts={facts} />
      {notes && (
        <DetailSection title={t(`${labelKey}.notes`)}>
          <p className="text-copy text-body whitespace-pre-wrap">{notes}</p>
        </DetailSection>
      )}
      <QRCodeSection member={member} />
    </div>
  )
}

export default MemberView
