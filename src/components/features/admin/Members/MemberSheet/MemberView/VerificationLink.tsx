'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { IconButton, TextField } from '@ds/primitives'
import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ignoreChange = () => undefined

// The public verification address, read-only, with a copy button
const VerificationLink = ({ url }: { url: string }) => {
  const t = useTranslations()
  const { handleCopy, isCopied } = useCopyWithFeedback(url)
  const CopyIcon = isCopied ? Check : Copy

  return (
    <div className="flex items-center gap-2">
      <TextField
        aria-label={t('admin.members.qrCode.linkLabel')}
        className="min-w-0 flex-1"
        onValueChange={ignoreChange}
        readOnly
        value={url}
      />
      <IconButton
        aria-label={t(isCopied ? 'common.actions.copied' : 'admin.members.actions.copyLink')}
        isTooltipOpen={isCopied}
        onClick={handleCopy}
        size="md"
      >
        <CopyIcon className={isCopied ? 'text-success size-4.5' : 'size-4.5'} />
      </IconButton>
    </div>
  )
}

export default VerificationLink
