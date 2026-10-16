'use client'

import { useListDates } from '@components/features/admin/shared'
import { DetailSection, type Fact, FactsGrid } from '@components/features/observations'
import { useMemberApplicationQuery } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { useNow, useTranslations } from 'next-intl'

import QRCodeSection from './QRCodeSection'
import { isMembershipOver, StatusBadge } from '../../shared'

const emptyValue = '—'

// Read-only member: status, contact, personal and membership facts, motivation, notes, QR code
const MemberView = ({ member }: { member: Member }) => {
  const t = useTranslations()
  const now = useNow()
  const { formatDate } = useListDates()
  // Online applicants only: how they said they'd pay, to check before approving
  const { data: application } = useMemberApplicationQuery(member.id)
  const { address, age, createdAt, email, expiresAt, gender, joinedAt, memberId } = member
  const { motivation, notes, occupation, phone, status } = member
  const labelKey = 'admin.members.form.labels'

  const facts: Fact[] = [
    {
      label: t(`${labelKey}.email`),
      value: <span className="break-all">{email || emptyValue}</span>,
    },
    { label: t(`${labelKey}.phone`), value: phone || emptyValue },
    { label: t(`${labelKey}.age`), value: age ?? emptyValue },
    {
      label: t(`${labelKey}.gender`),
      value: gender ? t(`admin.members.genders.${gender}`) : emptyValue,
    },
    { label: t(`${labelKey}.address`), value: address || emptyValue },
    { label: t(`${labelKey}.occupation`), value: occupation || emptyValue },
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
    ...(application
      ? [
          {
            label: t('admin.members.view.paymentMethod'),
            value: t(`admin.members.paymentMethods.${application.paymentMethod}`),
          },
        ]
      : []),
    { label: t(`${labelKey}.memberId`), value: <span className="font-mono">{memberId}</span> },
  ]

  return (
    <div className="pb-8">
      <div className="px-4 pt-4">
        <StatusBadge status={status} />
      </div>
      <FactsGrid facts={facts} />
      {/* Always shown, like the other personal details: empty reads as "not given" */}
      <DetailSection title={t(`${labelKey}.motivation`)}>
        <p className="text-copy text-body whitespace-pre-wrap">{motivation || emptyValue}</p>
      </DetailSection>
      {notes && (
        <DetailSection title={t(`${labelKey}.notes`)}>
          <p className="text-copy text-body whitespace-pre-wrap">{notes}</p>
        </DetailSection>
      )}
      {/* The card's QR code is a separate concern from the member's details */}
      <div className="border-rule mt-6 border-t">
        <QRCodeSection member={member} />
      </div>
    </div>
  )
}

export default MemberView
