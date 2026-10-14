import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { SheetSteps } from './types'
import { IconButton } from '../../primitives'

type SheetStepButtonsProps = {
  nextLabel: string
  previousLabel: string
  steps: SheetSteps
}

// At the ends the arrows are aria-disabled, not disabled: a disabled button
// drops keyboard focus out of the sheet
const edgeClasses =
  'aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:bg-transparent'

// Previous / next arrows for a sheet that steps through a list. Pass the same
// `steps` to the Sheet so ←/→ work too.
const SheetStepButtons = ({ nextLabel, previousLabel, steps }: SheetStepButtonsProps) => {
  const { hasNext, hasPrevious, onNext, onPrevious } = steps

  return (
    <>
      <IconButton
        aria-disabled={!hasPrevious}
        aria-label={previousLabel}
        className={edgeClasses}
        onClick={hasPrevious ? onPrevious : undefined}
        size="md"
      >
        <ChevronLeft aria-hidden className="size-4.5" />
      </IconButton>
      <IconButton
        aria-disabled={!hasNext}
        aria-label={nextLabel}
        className={edgeClasses}
        onClick={hasNext ? onNext : undefined}
        size="md"
      >
        <ChevronRight aria-hidden className="size-4.5" />
      </IconButton>
    </>
  )
}

export default SheetStepButtons
