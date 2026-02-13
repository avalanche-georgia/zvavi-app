'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@components/hooks'
import { Button, DatePicker, InputBlock, Modal, ModalBody, ModalFooter } from '@components/ui'
import { useMemberUpdate } from '@data/hooks/members'
import type { Member } from '@domain/types'
import { addYears, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'

type ApproveDialogProps = {
  isOpen: boolean
  member: Member
  onClose: VoidFunction
}

const ApproveDialog = ({ isOpen, member, onClose }: ApproveDialogProps) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: updateMember } = useMemberUpdate()

  const [joinedAt, setJoinedAt] = useState<Date | null>(null)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)

  useEffect(() => {
    if (isOpen) {
      const today = startOfDay(new Date())

      setJoinedAt(today)
      setExpiresAt(addYears(today, 1))
    }
  }, [isOpen])

  const handleApprove = async () => {
    try {
      await updateMember({ expiresAt, id: member.id, joinedAt, status: 'active' })
      toastSuccess(t('admin.members.messages.approved'))
      onClose()
    } catch (error) {
      toastError('ApproveDialog', { error })
    }
  }

  const fullName = `${member.firstName} ${member.lastName}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('admin.members.approveModal.title')}>
      <ModalBody>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            {t('admin.members.approveModal.description', { name: fullName })}
          </p>
          <InputBlock label={t('admin.members.form.labels.joinedAt')}>
            <DatePicker maxDate={new Date()} onChange={setJoinedAt} value={joinedAt} />
          </InputBlock>
          <InputBlock label={t('admin.members.form.labels.expiresAt')}>
            <DatePicker
              isClearable
              minDate={joinedAt ?? undefined}
              onChange={setExpiresAt}
              value={expiresAt}
            />
          </InputBlock>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="ml-auto" onClick={onClose} variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button onClick={handleApprove}>{t('admin.members.actions.approve')}</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ApproveDialog
