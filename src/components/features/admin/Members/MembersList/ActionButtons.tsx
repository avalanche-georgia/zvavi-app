'use client'

import { useCallback } from 'react'
import { useCopyWithFeedback } from '@components/hooks'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Tooltip,
} from '@components/ui'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { downloadQRCode, getVerificationUrl } from '@/lib/qrcode'
import { cn } from '@/lib/utils'

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
            iconProps={{ icon: 'userRoundCheck' }}
            onClick={onApprove}
          />
        </Tooltip>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <IconButton
              className="data-popup-open:bg-black/5 data-popup-open:stroke-gray-900"
              iconProps={{ icon: 'ellipsisVertical' }}
            />
          }
        />
        <DropdownMenuContent>
          <DropdownMenuItem
            className={isCopied ? 'text-green-600' : undefined}
            closeOnClick={false}
            iconProps={{
              className: cn(isCopied && 'animate-copy-pop stroke-green-600!'),
              icon: isCopied ? 'check' : 'link',
            }}
            onClick={handleCopy}
          >
            {t('admin.members.qrCode.copyUrl')}
          </DropdownMenuItem>

          <DropdownMenuItem iconProps={{ icon: 'download' }} onClick={handleDownloadQR}>
            {t('admin.members.qrCode.download')}
          </DropdownMenuItem>

          <DropdownMenuItem iconProps={{ icon: 'pencil' }} render={<Link href={editHref} />}>
            {t('admin.members.actions.edit')}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600 data-highlighted:bg-red-50"
            iconProps={{ icon: 'trash' }}
            onClick={onDelete}
          >
            {t('admin.members.actions.delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ActionButtons
