import type { HazardLevels as HazardLevelsType, Region } from '@domain/types'

import Pyramid from './Pyramid'
import ZoneTitle from './ZoneTitle'

type HazardLevelsByElevationProps = {
  hazardLevels: HazardLevelsType
  region: Pick<Region, 'elevationHighM' | 'elevationLowM'>
}

// Same thresholds as the public API (regions table). Regions without them keep
// the values the site has always shown.
const defaultThresholds = { high: 2600, low: 2000 }

const HazardLevelsByElevation = ({ hazardLevels, region }: HazardLevelsByElevationProps) => {
  const high = region.elevationHighM ?? defaultThresholds.high
  const low = region.elevationLowM ?? defaultThresholds.low

  return (
    <section className="relative flex pl-4">
      <div className="flex w-full flex-col justify-between text-sm text-gray-600">
        <ZoneTitle
          className="h-24"
          elevationRange={`> ${high}m`}
          title="High Alpine"
          width="w-[calc(100%-157px)]"
        />
        <ZoneTitle
          className="h-16"
          elevationRange={`${low}-${high}m`}
          title="Alpine"
          width="w-[calc(100%-184px)]"
        />
        <ZoneTitle
          className="h-16"
          elevationRange={`< ${low}m`}
          title="Sub Alpine"
          width="w-[calc(100%-212px)]"
        />
      </div>

      <Pyramid hazardLevels={hazardLevels} />
    </section>
  )
}

export default HazardLevelsByElevation
