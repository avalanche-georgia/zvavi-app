'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { IconButton } from '@ds/primitives'
import { Check, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'

type CopyFieldProps = {
  label: string
  value: string
}

// A labelled value (account number, SWIFT…) with a copy button. Render inside a <dl>
// (CopyFieldGroup): a group of fields is one description list
const CopyField = ({ label, value }: CopyFieldProps) => {
  const t = useTranslations()
  const { handleCopy, isCopied } = useCopyWithFeedback(value)
  const actionLabel = isCopied ? t('common.actions.copied') : t('common.actions.copy')

  return (
    <div className="relative pr-12">
      <dt className="text-caption text-muted">{label}</dt>
      <dd className="text-copy text-ink font-mono break-all">
        {value}
        {/* Centred on the whole row, beside label and value */}
        <span className="absolute inset-y-0 right-0 flex items-center">
          <IconButton
            aria-label={`${actionLabel}: ${label}`}
            isTooltipOpen={isCopied}
            onClick={handleCopy}
            tooltip={actionLabel}
          >
            {isCopied ? (
              <Check aria-hidden className="text-success animate-copy-pop size-4.5" />
            ) : (
              <Copy aria-hidden className="size-4.5" />
            )}
          </IconButton>
        </span>
      </dd>
    </div>
  )
}

export default CopyField
