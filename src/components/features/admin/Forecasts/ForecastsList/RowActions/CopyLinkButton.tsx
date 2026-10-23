'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { IconButton } from '@ds/primitives'
import { Check, Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

type CopyLinkButtonProps = {
  forecastId: number
  getUrl: () => string
}

// The forecast's own public link — what forecasters share, so its preview is that forecast's
const CopyLinkButton = ({ forecastId, getUrl }: CopyLinkButtonProps) => {
  const t = useTranslations()
  const { handleCopy, isCopied } = useCopyWithFeedback(getUrl)
  const label = isCopied ? t('common.actions.copied') : t('admin.forecasts.actions.copyLink')

  return (
    <IconButton
      aria-label={
        isCopied ? label : t('admin.forecasts.actions.copyLinkForForecast', { id: forecastId })
      }
      isTooltipOpen={isCopied}
      onClick={handleCopy}
      tooltip={label}
    >
      {isCopied ? (
        <Check aria-hidden className="text-success animate-copy-pop size-4.5" />
      ) : (
        <Link2 aria-hidden className="size-4.5" />
      )}
    </IconButton>
  )
}

export default CopyLinkButton
