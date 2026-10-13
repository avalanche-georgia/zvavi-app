import SectionCard from '@components/features/forecast/sections/SectionCard'
import type { PublicObservation, RegionId } from '@domain/types'
import { Map, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import RecentAvalancheRow from './RecentAvalancheRow'

import { routes } from '@/routes'

type RecentAvalanchesCardProps = {
  // null: the lookup failed — the card keeps its links, without a list
  avalanches: PublicObservation[] | null
  regionId: RegionId
}

const linkClasses =
  'focus-ring text-accent hover:text-accent-hover text-copy-sm rounded-sm font-semibold'
const buttonClasses =
  'focus-ring border-rule bg-surface text-ink hover:bg-tile rounded-media text-copy flex h-11 items-center justify-center gap-1.5 border font-semibold transition-colors'

// The latest avalanche observations of the region, with ways to see all of
// them, report one, or open the map
const RecentAvalanchesCard = ({ avalanches, regionId }: RecentAvalanchesCardProps) => {
  const t = useTranslations()
  const observationRoutes = routes.observationsByRegion(regionId)

  return (
    <SectionCard
      action={
        <Link className={linkClasses} href={observationRoutes.root}>
          {t('regionHome.avalanches.seeAll')}
        </Link>
      }
      title={t('forecast.sections.recentAvalanches.title')}
    >
      {avalanches?.length === 0 && (
        <p className="text-muted text-copy">
          {t('forecast.sections.recentAvalanches.noAvalanches')}
        </p>
      )}
      {avalanches && avalanches.length > 0 && (
        <ul className="divide-rule -mt-2.5 flex flex-col divide-y">
          {avalanches.map((avalanche) => (
            <li key={avalanche.id}>
              <RecentAvalancheRow avalanche={avalanche} />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link className={buttonClasses} href={observationRoutes.submit}>
          <Plus aria-hidden className="size-4.5" />
          {t('observations.reportCta')}
        </Link>
        <Link className={buttonClasses} href={observationRoutes.map}>
          <Map aria-hidden className="size-4.5" />
          {t('observations.view.map')}
        </Link>
      </div>
    </SectionCard>
  )
}

export default RecentAvalanchesCard
