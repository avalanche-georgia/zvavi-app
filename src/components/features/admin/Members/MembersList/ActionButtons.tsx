import { useCallback } from 'react'
import { IconButton, Tooltip } from '@components/ui'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'

type ActionButtonsProps = {
  editHref: string
  memberId: string
  onDelete: VoidFunction
  verificationCode: string
}

const ActionButtons = ({ editHref, memberId, onDelete, verificationCode }: ActionButtonsProps) => {
  const t = useTranslations()
  const [, copyToClipboard] = useCopyToClipboard()

  const handleDownloadQR = useCallback(async () => {
    const fileName = `member-qr-${memberId}`

    await downloadQRCode(verificationCode, fileName)
  }, [memberId, verificationCode])

  const handleCopyUrl = useCallback(() => {
    const url = getVerificationUrl(verificationCode)

    copyToClipboard(url)
  }, [copyToClipboard, verificationCode])

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={t('admin.members.qrCode.copyUrl')}>
        <span>
          <IconButton iconProps={{ icon: 'copy' }} onClick={handleCopyUrl} />
        </span>
      </Tooltip>
      <Tooltip content={t('admin.members.qrCode.download')}>
        <span>
          <IconButton iconProps={{ icon: 'download' }} onClick={handleDownloadQR} />
        </span>
      </Tooltip>
      <Tooltip content={t('admin.members.actions.edit')}>
        <span>
          <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
        </span>
      </Tooltip>
      <Tooltip content={t('admin.members.actions.delete')}>
        <span>
          <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
        </span>
      </Tooltip>
    </div>
  )
}

export default ActionButtons
