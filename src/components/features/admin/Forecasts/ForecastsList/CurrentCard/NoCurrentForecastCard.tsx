'use client'

import { useTransition } from 'react'
import type { ForecastListItem, RegionId } from '@domain/types'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { cardShellClasses } from './cardShell'
import { useListDates } from '../hooks'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type NoCurrentForecastCardProps = { latestDraft?: ForecastListItem; regionId: RegionId }

const NoCurrentForecastCard = ({ latestDraft, regionId }: NoCurrentForecastCardProps) => {
  const t = useTranslations()
  const router = useRouter()
  const [isNavigating, startNavigation] = useTransition()
  const { formatDate } = useListDates()

  const handleDraftContinue = () => {
    if (!latestDraft) return
    startNavigation(() =>
      router.push(routes.admin.forecasts.editInRegion(latestDraft.id, regionId)),
    )
  }

  return (
    <section className={cn(cardShellClasses, 'grid-cols-[1fr_auto]')}>
      <div className="min-w-0">
        <p className="text-caption text-muted font-semibold tracking-wide uppercase">
          {t('admin.forecasts.current.noneEyebrow')}
        </p>
        <h2 className="text-heading text-ink font-semibold">
          {t('admin.forecasts.current.noneTitle', { region: t(`regions.names.${regionId}`) })}
        </h2>
        <p className="text-copy-sm text-muted">
          {latestDraft
            ? t('admin.forecasts.current.latestDraft', {
                date: formatDate(latestDraft.createdAt),
                name: latestDraft.forecaster || `#${latestDraft.id}`,
              })
            : t('admin.forecasts.current.noneHint')}
        </p>
      </div>
      {latestDraft && (
        <Button isBusy={isNavigating} onClick={handleDraftContinue} size="sm" variant="secondary">
          {t('admin.forecasts.current.continueDraft')}
        </Button>
      )}
    </section>
  )
}

export default NoCurrentForecastCard
