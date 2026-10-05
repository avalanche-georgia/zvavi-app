'use client'

import { useTransition } from 'react'
import type { Forecast, RegionId } from '@domain/types'
import { Button, Tooltip } from '@ds/primitives'
import { differenceInMinutes } from 'date-fns'
import { Copy, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { cardShellClasses } from './cardShell'
import CurrentForecastHeading from './CurrentForecastHeading'
import ZoneTiles from './ZoneTiles'
import { HazardTile } from '../cells'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type CurrentForecastCardProps = { forecast: Forecast; now: Date; regionId: RegionId }

const CurrentForecastCard = ({ forecast, now, regionId }: CurrentForecastCardProps) => {
  const t = useTranslations()
  const router = useRouter()
  const [isNavigating, startNavigation] = useTransition()
  const { hazardLevels, id, validUntil } = forecast
  const hoursLeft = validUntil ? differenceInMinutes(validUntil, now) / 60 : 0
  const isExpired = hoursLeft <= 0
  const endsInHours = hoursLeft > 0 && hoursLeft < 24 ? Math.max(1, Math.round(hoursLeft)) : null
  // The page opens on this site (staging opens staging); rendered client-side only
  const publicUrl = `${window.location.host}${routes.regionHome(regionId)}`

  const handlePublicPageOpen = () => window.open(routes.regionHome(regionId), '_blank', 'noopener')
  const handleDuplicate = () =>
    startNavigation(() => router.push(routes.admin.forecasts.duplicateInRegion(id, regionId)))

  return (
    <section
      className={cn(
        cardShellClasses,
        'grid-cols-[auto_1fr_auto] @max-[47.5rem]:grid-cols-[auto_1fr]',
      )}
    >
      <HazardTile level={hazardLevels.overall} size="lg" />
      <div className="flex min-w-0 items-center gap-6">
        <CurrentForecastHeading
          endsInHours={endsInHours}
          forecast={forecast}
          isExpired={isExpired}
        />
        <ZoneTiles className="@max-[62.5rem]:hidden" hazardLevels={hazardLevels} />
      </div>
      <div className="flex flex-wrap gap-2 @max-[47.5rem]:col-span-2">
        <Tooltip label={t('admin.forecasts.current.openPublicPageHint', { url: publicUrl })}>
          <Button onClick={handlePublicPageOpen} size="sm" variant="secondary">
            <ExternalLink aria-hidden className="size-4" />
            {t('admin.forecasts.actions.openPublicPage')}
          </Button>
        </Tooltip>
        <Button isBusy={isNavigating} onClick={handleDuplicate} size="sm" variant="secondary">
          <Copy aria-hidden className="size-4" />
          {t('admin.forecasts.actions.duplicate')}
        </Button>
      </div>
    </section>
  )
}

export default CurrentForecastCard
