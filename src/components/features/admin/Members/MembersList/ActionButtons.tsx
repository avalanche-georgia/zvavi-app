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
        <IconButton iconProps={{ icon: 'copy' }} onClick={handleCopyUrl} />
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
