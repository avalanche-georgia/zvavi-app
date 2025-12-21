import type { Problem } from '@domain/types'

import Aspects from './Aspects'
import AvalancheSize from './AvalancheSize'
import Distribution from './Distribution'
import Sensitivity from './Sensitivity'
import TimeOfDay from './TimeOfDay'
import Trend from './Trend'

const ProblemDetails = ({ problem }: { problem: Problem }) => {
  const {
    aspects,
    avalancheSize,
    description,
    distribution,
    isAllDay,
    sensitivity,
    timeOfDay,
    trend,
  } = problem

  return (
    <>
      {description && (
        <p className="mb-4 whitespace-pre-line text-justify text-sm">{description}</p>
      )}
      <div className="grid grid-cols-2 justify-items-center gap-2">
        <AvalancheSize avalancheSize={avalancheSize} />
        <Aspects aspects={aspects} />
        <Sensitivity sensitivity={sensitivity} />
        <Distribution distribution={distribution} />
        <Trend trend={trend} />
        <TimeOfDay isAllDay={isAllDay} timeOfDay={timeOfDay} />
      </div>
    </>
  )
}

export default ProblemDetails
