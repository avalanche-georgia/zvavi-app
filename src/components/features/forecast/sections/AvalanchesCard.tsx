import type { PublicAvalanche, RegionId } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import AvalancheCard from './AvalancheCard'
import SectionCard from './SectionCard'

import { routes } from '@/routes'

type AvalanchesCardProps = {
  avalanches: PublicAvalanche[]
  className?: string
  regionId: RegionId
}

const AvalanchesCard = ({ avalanches, className, regionId }: AvalanchesCardProps) => {
  const t = useTranslations()
  const key = 'forecast.sections.recentAvalanches'

  return (
    <SectionCard
      className={className}
      count={avalanches.length || undefined}
      id="avalanches"
      title={t(`${key}.title`)}
    >
      {avalanches.length === 0 ? (
        <p className="text-muted text-copy">{t(`${key}.noAvalanches`)}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {avalanches.map((avalanche) => (
            <li key={avalanche.id}>
              <AvalancheCard avalanche={avalanche} />
            </li>
          ))}
        </ul>
      )}
      <Link
        className="focus-ring border-rule text-ink hover:bg-tile rounded-media text-copy mt-2 flex h-11 items-center justify-center gap-1.5 border font-semibold transition-colors"
        href={routes.observationsByRegion(regionId).root}
      >
        {t('forecast.page.allObservations')}
        <ChevronRight aria-hidden className="size-4.5" />
      </Link>
    </SectionCard>
  )
}

export default AvalanchesCard
