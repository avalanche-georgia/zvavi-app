import type { HazardLevels as HazardLevelsType } from '@domain/types'

import Pyramid from './Pyramid'
import ZoneTitle from './ZoneTitle'

const HazardLevelsByElevation = ({ hazardLevels }: { hazardLevels: HazardLevelsType }) => (
  <section className="relative flex pl-4">
    <div className="flex w-full flex-col justify-between text-sm text-gray-600">
      <ZoneTitle
        className="h-24"
        elevationRange="> 2600m"
        title="High Alpine"
        width="w-[calc(100%-157px)]"
      />
      <ZoneTitle
        className="h-16"
        elevationRange="2000-2600m"
        title="Alpine"
        width="w-[calc(100%-184px)]"
      />
      <ZoneTitle
        className="h-16"
        elevationRange="< 2000m"
        title="Sub Alpine"
        width="w-[calc(100%-212px)]"
      />
    </div>

    <Pyramid hazardLevels={hazardLevels} />
  </section>
)

export default HazardLevelsByElevation
