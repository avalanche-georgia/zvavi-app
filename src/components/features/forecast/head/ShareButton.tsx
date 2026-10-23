'use client'

import { useCopyWithFeedback } from '@components/hooks'
import type { Forecast } from '@domain/types'
import { IconButton } from '@ds/primitives'
import { Check, Share2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

// Phones get the system share sheet (messengers, mail…). Desktop browsers may have one too,
// but there copying the link is what people expect.
const canOpenShareSheet = () =>
  typeof navigator.share === 'function' && window.matchMedia('(pointer: coarse)').matches

// Always the forecast's own link, also on the current-forecast page: messengers cache a
// preview per link, so a per-forecast link previews this forecast
const ShareButton = ({ forecast }: { forecast: Pick<Forecast, 'id' | 'regionId'> }) => {
  const t = useTranslations()
  const { id, regionId } = forecast
  // Read on click, not in render: the server has no window
  const getUrl = () => `${window.location.origin}${routes.forecastsByRegion(regionId).view(id)}`
  const { handleCopy, isCopied } = useCopyWithFeedback(getUrl)
  const label = isCopied ? t('forecast.page.linkCopied') : t('forecast.page.share')

  const handleShare = async () => {
    if (!canOpenShareSheet()) return handleCopy()

    try {
      await navigator.share({ title: document.title, url: getUrl() })
    } catch (error) {
      // Closed the sheet: nothing to do. Anything else (refused, unsupported): copy instead
      if (error instanceof DOMException && error.name === 'AbortError') return

      await handleCopy()
    }
  }

  return (
    <IconButton
      aria-label={label}
      className="border-rule bg-surface border"
      isTooltipOpen={isCopied}
      onClick={handleShare}
      size="md"
    >
      {isCopied ? (
        <Check aria-hidden className="text-success animate-copy-pop size-4.5" />
      ) : (
        <Share2 aria-hidden className="size-4.5" />
      )}
    </IconButton>
  )
}

export default ShareButton
