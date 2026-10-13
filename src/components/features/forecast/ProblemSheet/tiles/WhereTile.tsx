import { BandCompass } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import { sortedElevationZones } from '@domain/constants'
import type { Aspects } from '@domain/types'
import { useTranslations } from 'next-intl'

import Tile from './Tile'

type WhereTileProps = {
  aspects: Aspects
  onInfoOpen: VoidFunction
}

// One labelled compass per elevation band; a band without the problem is faded
const WhereTile = ({ aspects, onInfoOpen }: WhereTileProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()

  return (
    <Tile
      isWide
      label={t('forecast.sections.avalancheProblems.modal.labels.aspects')}
      onInfoOpen={onInfoOpen}
    >
      {/* The compasses are colour-coded — the summary says the same in words */}
      <div
        aria-label={getSummary(aspects) ?? undefined}
        className="grid grid-cols-3 gap-1.5"
        role="img"
      >
        {sortedElevationZones.map((zone) => {
          const zoneAspects = aspects[zone] ?? []

          return (
            <BandCompass
              key={zone}
              aspects={zoneAspects}
              isDimmed={zoneAspects.length === 0}
              label={t(`common.elevationZones.${zone}`)}
              surface="tile"
            />
          )
        })}
      </div>
    </Tile>
  )
}

export default WhereTile
