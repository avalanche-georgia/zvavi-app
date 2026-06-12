'use client'

import { useBoolean } from '@components/hooks'
import { Icon } from '@components/icons'
import { ButtonLink } from '@components/shared'
import { Button } from '@components/ui'
import { dateFormat } from '@domain/constants'
import type { Member } from '@domain/types'
import { format, parseISO } from 'date-fns'
import { useTranslations } from 'next-intl'

import QRCodeSection from '../MemberForm/QRCodeSection'
import ApproveDialog from '../MembersList/ApproveDialog'
import StatusBadge from '../MembersList/StatusBadge'

import { routes } from '@/routes'

type MemberViewProps = {
  member: Member
}

type FieldProps = {
  label: string
  value: React.ReactNode
}

const Field = ({ label, value }: FieldProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">{label}</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
)

const MemberView = ({ member }: MemberViewProps) => {
  const t = useTranslations()
  const [isApproveDialogOpen, { setFalse: closeApproveDialog, setTrue: openApproveDialog }] =
    useBoolean(false)

  const { createdAt, email, expiresAt, id, joinedAt, memberId, notes, phone, status } = member

  const isPending = status === 'pending'

  const formattedJoinedAt = format(joinedAt, dateFormat)
  const formattedExpiresAt = expiresAt
    ? format(expiresAt, dateFormat)
    : t('admin.members.form.placeholders.expiresAt')
  const formattedCreatedAt = format(parseISO(createdAt), dateFormat)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="flex-1 text-xl font-semibold">{`${member.firstName} ${member.lastName}`}</h2>

        <div className="flex items-center gap-2">
          {isPending && (
            <Button
              className="bg-white hover:text-green-600"
              onClick={openApproveDialog}
              variant="outline"
            >
              <Icon icon="userRoundCheck" size="sm" />
              {t('admin.members.actions.approve')}
            </Button>
          )}
          <ButtonLink href={routes.admin.members.edit(id)}>
            <Icon icon="pencil" size="sm" />
            {t('admin.members.actions.edit')}
          </ButtonLink>
        </div>
      </div>

      <div className="rounded-sm border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label={t('admin.members.form.labels.memberId')} value={memberId} />
          <Field
            label={t('admin.members.form.labels.status')}
            value={<StatusBadge status={status} />}
          />
          <Field
            label={t('admin.members.form.labels.email')}
            value={email || t('admin.members.view.noEmail')}
          />
          <Field
            label={t('admin.members.form.labels.phone')}
            value={phone || t('admin.members.view.noPhone')}
          />
          <Field label={t('admin.members.form.labels.joinedAt')} value={formattedJoinedAt} />
          <Field label={t('admin.members.form.labels.expiresAt')} value={formattedExpiresAt} />
          <Field label={t('admin.members.view.registeredAt')} value={formattedCreatedAt} />
          <Field
            label={t('admin.members.form.labels.notes')}
            value={notes || t('admin.members.view.noNotes')}
          />
        </div>
      </div>

      <QRCodeSection member={member} />

      <ApproveDialog isOpen={isApproveDialogOpen} member={member} onClose={closeApproveDialog} />
    </div>
  )
}

export default MemberView
