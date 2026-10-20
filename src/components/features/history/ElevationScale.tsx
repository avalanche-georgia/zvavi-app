import HazardTile from '@components/features/forecasts/HazardTile'
import { hazardLevelNamesByScale, sortedElevationZones } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

// Danger per elevation zone, high alpine on top
const ElevationScale = ({ hazardLevels }: { hazardLevels: HazardLevels }) => {
  const t = useTranslations()

  return (
    <ul
      aria-label={t('forecast.history.elevationScale')}
      className="bg-tile flex flex-col gap-0.75 self-start rounded-lg p-1"
    >
      {sortedElevationZones.map((zone) => {
        const level = hazardLevels[zone]
        const label = t('forecast.history.elevationLevel', {
          level: t(hazardLevelNamesByScale[level]),
          zone: t(`common.elevationZones.${zone}`),
        })

        return (
          <li key={zone}>
            <HazardTile
              className="text-micro h-4 w-5.5 rounded-sm"
              label={label}
              level={level}
              palette="public"
              size="sm"
              title={label}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ElevationScale
