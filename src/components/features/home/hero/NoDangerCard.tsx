import type { RegionId } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

type NoDangerCardProps = {
  isOffSeason: boolean
  regionId: RegionId
}

// In place of the danger card while the region has nothing to rate: off-season,
// or nothing published yet. Leads to the previous forecasts.
const NoDangerCard = ({ isOffSeason, regionId }: NoDangerCardProps) => {
  const t = useTranslations()

  return (
    <Link
      className="group focus-ring rounded-card border-rule bg-surface text-ink hover:border-rule-strong block overflow-hidden border transition-colors"
      href={routes.forecastsByRegion(regionId).history}
    >
      <div className="bg-tile flex items-center gap-4 p-4.5">
        <span
          aria-hidden
          className="text-muted grid size-16 shrink-0 place-items-center rounded-xl text-xl font-bold shadow-[inset_0_0_0_1.5px_var(--color-off)]"
        >
          –
        </span>
        <span className="min-w-0">
          <span className="block text-xs font-semibold tracking-[.06em] uppercase">
            {t('home.noDanger.label')}
          </span>
          <span className="text-title-lg mt-0.5 block font-bold">
            {isOffSeason ? t('home.noDanger.offSeason') : t('home.noDanger.notIssued')}
          </span>
        </span>
      </div>
      <span className="border-rule text-body text-copy group-hover:bg-canvas flex items-center justify-between border-t px-4.5 py-3.5 font-semibold transition-colors">
        {isOffSeason ? t('home.noDanger.lastSeason') : t('home.noDanger.archive')}
        <ChevronRight aria-hidden className="size-4.5" />
      </span>
    </Link>
  )
}

export default NoDangerCard
