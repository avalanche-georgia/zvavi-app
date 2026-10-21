import { useListDates } from '@components/features/admin/shared'
import { ConfirmationList, NewTabLink, richBold } from '@components/shared'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

// Body of the record's delete confirmation: what goes, and which forecasts lose
// the link (they stay). Newest forecast first, with its validity; each opens in a
// new tab so the question stays open.
const AvalancheDeleteMessage = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { formatDate } = useListDates()
  const links = [...avalanche.forecastAvalanche].sort(
    (first, second) => second.forecastId - first.forecastId,
  )

  const items = links.map(({ forecastId, forecasts }) => (
    <>
      <NewTabLink
        className="focus-ring text-accent hover:text-accent-hover rounded-badge font-semibold underline-offset-3 hover:underline"
        href={routes.admin.forecasts.view(forecastId)}
      >
        {t('admin.recentAvalanches.view.forecastLink', { id: forecastId })}
      </NewTabLink>
      {forecasts?.validUntil && (
        <span className="text-copy-sm text-muted"> · {formatDate(forecasts.validUntil)}</span>
      )}
    </>
  ))

  return (
    <>
      <p>{t('admin.recentAvalanches.sheet.deleteMessage')}</p>
      {links.length > 0 && (
        <>
          <p>
            {t.rich('admin.recentAvalanches.sheet.deleteLinked', {
              b: richBold,
              count: links.length,
            })}
          </p>
          <ConfirmationList items={items} />
        </>
      )}
    </>
  )
}

export default AvalancheDeleteMessage
