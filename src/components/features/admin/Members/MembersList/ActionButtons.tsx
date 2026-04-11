'use client'

import { useCallback } from 'react'
import { useCopyWithFeedback } from '@components/hooks'
import { IconButton, Tooltip } from '@components/ui'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type ActionButtonsProps = {
  editHref: string
  isPending?: boolean
  memberId: string
  onApprove?: VoidFunction
  onDelete: VoidFunction
  verificationCode: string
}

const ActionButtons = ({
  editHref,
  isPending,
  memberId,
  onApprove,
  onDelete,
  verificationCode,
}: ActionButtonsProps) => {
  const t = useTranslations()
  const { handleCopy, isCopied } = useCopyWithFeedback(getVerificationUrl(verificationCode))

  const handleDownloadQR = useCallback(async () => {
    await downloadQRCode(verificationCode, `member-qr-${memberId}`)
  }, [memberId, verificationCode])

  return (
    <div className="flex items-center justify-end gap-2">
      {isPending && (
        <Tooltip content={t('admin.members.actions.approve')}>
          <IconButton
            className="hover:stroke-green-600"
            iconProps={{ icon: 'check' }}
            onClick={onApprove}
          />
        </Tooltip>
      )}
      <Tooltip content={t('admin.members.qrCode.copyUrl')}>
        <IconButton
          className={clsx(isCopied && 'animate-copy-pop stroke-green-600!')}
          iconProps={{ icon: isCopied ? 'check' : 'link' }}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip content={t('admin.members.qrCode.download')}>
        <IconButton iconProps={{ icon: 'download' }} onClick={handleDownloadQR} />
      </Tooltip>
      <Tooltip content={t('admin.members.actions.edit')}>
        <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
      </Tooltip>
      <Tooltip content={t('admin.members.actions.delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
