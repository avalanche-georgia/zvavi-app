import type { RegionId } from '@domain/types'
import { ChevronRight, Map } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type ForecastAreaLinkProps = {
  className?: string
  regionId: RegionId
}

// Card link to the map of the area this forecast covers
const ForecastAreaLink = ({ className, regionId }: ForecastAreaLinkProps) => {
  const t = useTranslations()

  return (
    <Link
      className={cn(
        'focus-ring rounded-card border-rule bg-surface text-ink hover:border-rule-strong flex items-center gap-3 border p-3 transition-colors',
        className,
      )}
      href={routes.forecastsByRegion(regionId).forecastArea}
    >
      <span
        aria-hidden
        className="bg-map text-muted rounded-control grid size-16 shrink-0 place-items-center"
      >
        <Map className="size-6" />
      </span>
      <span className="min-w-0 flex-1">
        <b className="text-copy-lg block font-semibold">{t('navigation.forecastArea')}</b>
        <span className="text-muted text-copy-sm">{t(`regions.names.${regionId}`)}</span>
      </span>
      <ChevronRight aria-hidden className="text-muted size-4.5 shrink-0" />
    </Link>
  )
}

export default ForecastAreaLink
