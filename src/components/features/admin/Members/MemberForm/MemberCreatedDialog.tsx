'use client'

import { useCallback } from 'react'
import { Icon } from '@components/icons'
import { CopyInput } from '@components/shared'
import { BrandedQRCode, Button, Modal, ModalBody, ModalFooter } from '@components/ui'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type MemberCreatedDialogProps = {
  isOpen: boolean
  member: Member | null
  onClose: VoidFunction
}

const MemberCreatedDialog = ({ isOpen, member, onClose }: MemberCreatedDialogProps) => {
  const t = useTranslations()

  const verificationUrl = member ? getVerificationUrl(member.verificationCode) : ''
  const fullName = member ? `${member.firstName} ${member.lastName}` : ''

  const handleDownload = useCallback(async () => {
    if (!member) return
    const fileName = `member-qr-${member.memberId}`

    await downloadQRCode(member.verificationCode, fileName)
  }, [member])

  if (!member) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('admin.members.qrCode.successTitle')}>
      <ModalBody>
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-600">
            {t('admin.members.qrCode.successDescription', { name: fullName })}
          </p>

          <div className="rounded bg-white p-3 shadow">
            <BrandedQRCode size={180} value={verificationUrl} />
          </div>

          <div className="w-full">
            <CopyInput value={verificationUrl} />
          </div>

          <Button className="w-full" onClick={handleDownload} variant="secondary">
            <Icon icon="download" size="sm" />
            {t('admin.members.qrCode.download')}
          </Button>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button className="ml-auto" onClick={onClose}>
          {t('admin.members.qrCode.done')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default MemberCreatedDialog
