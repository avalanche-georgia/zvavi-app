import SectionCard from '@components/features/forecast/sections/SectionCard'
import type { PublicObservation, RegionId } from '@domain/types'
import { getButtonClasses } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import RecentAvalanchesList from './RecentAvalanchesList'

import { routes } from '@/routes'

type RecentAvalanchesCardProps = {
  // null: the lookup failed — the card keeps its links, without a list
  avalanches: PublicObservation[] | null
  regionId: RegionId
}

const linkClasses =
  'focus-ring text-accent hover:text-accent-hover text-copy-sm rounded-badge font-semibold'

// The latest avalanche observations of the region, with ways to see all of
// them or report one
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
      {avalanches && avalanches.length > 0 && <RecentAvalanchesList avalanches={avalanches} />}
      <Link
        className={getButtonClasses({ className: 'mt-3 w-full', variant: 'secondary' })}
        href={observationRoutes.submit}
      >
        <Plus aria-hidden className="size-4.5" />
        {t('observations.reportCta')}
      </Link>
    </SectionCard>
  )
}

export default RecentAvalanchesCard
