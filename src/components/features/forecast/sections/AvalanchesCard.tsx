import type { PublicAvalanche, RegionId } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import AvalancheCard from './AvalancheCard'
import CollapsibleCard from './CollapsibleCard'

import { routes } from '@/routes'

type AvalanchesCardProps = {
  avalanches: PublicAvalanche[]
  className?: string
  onAvalancheOpen: (index: number) => void
  // The record whose sheet is open
  openIndex: number | null
  regionId: RegionId
}

const AvalanchesCard = (props: AvalanchesCardProps) => {
  const { avalanches, className, onAvalancheOpen, openIndex, regionId } = props
  const t = useTranslations()
  const key = 'forecast.sections.recentAvalanches'

  return (
    <CollapsibleCard
      className={className}
      count={avalanches.length || undefined}
      id="avalanches"
      title={t(`${key}.title`)}
    >
      {avalanches.length === 0 ? (
        <p className="text-muted text-copy">{t(`${key}.noAvalanches`)}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {avalanches.map((avalanche, index) => (
            <li key={avalanche.id}>
              <AvalancheCard
                avalanche={avalanche}
                isSelected={index === openIndex}
                onOpen={() => onAvalancheOpen(index)}
              />
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
    </CollapsibleCard>
  )
}

export default AvalanchesCard
