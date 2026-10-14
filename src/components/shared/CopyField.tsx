'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { IconButton } from '@ds/primitives'
import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

type CopyFieldProps = {
  label: string
  value: string
}

// A labelled value (account number, SWIFT…) with a copy button
const CopyField = ({ label, value }: CopyFieldProps) => {
  const t = useTranslations()
  const { handleCopy, isCopied } = useCopyWithFeedback(value)
  const actionLabel = isCopied ? t('common.actions.copied') : t('common.actions.copy')

  return (
    <div className="flex items-center gap-3">
      <dl className="min-w-0 flex-1">
        <dt className="text-caption text-muted">{label}</dt>
        <dd className="text-copy text-ink font-mono break-all">{value}</dd>
      </dl>
      <IconButton
        aria-label={`${actionLabel}: ${label}`}
        onClick={handleCopy}
        tooltip={actionLabel}
      >
        {isCopied ? (
          <Check aria-hidden className="text-success animate-copy-pop size-4.5" />
        ) : (
          <Copy aria-hidden className="size-4.5" />
        )}
      </IconButton>
    </div>
  )
}

export default CopyField
