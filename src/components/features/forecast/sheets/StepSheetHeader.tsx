import { SheetClose, SheetTitle } from '@components/ui'
import { IconButton } from '@ds/primitives'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type StepSheetHeaderProps = {
  index: number
  nextLabel: string
  onNext: VoidFunction
  onPrevious: VoidFunction
  // e.g. "Problem 1 of 2"
  positionLabel: string
  previousLabel: string
  // Accessible name of the sheet
  title: string
  total: number
}

// At the ends the arrows are aria-disabled, not disabled: a disabled button
// drops keyboard focus out of the sheet (the handlers ignore the extra step)
const edgeClasses =
  'aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:bg-transparent'

// Header of a sheet that steps through a list: × · position · previous / next.
// Icon-only buttons: their names show as tooltips.
const StepSheetHeader = (props: StepSheetHeaderProps) => {
  const { index, nextLabel, onNext, onPrevious, positionLabel, previousLabel, title, total } = props
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<IconButton aria-label={t('common.actions.close')} size="md" />}>
        <X aria-hidden className="size-4.5" />
      </SheetClose>
      <SheetTitle className="sr-only">{title}</SheetTitle>
      <span className="text-muted text-copy-sm flex-1">{positionLabel}</span>
      <IconButton
        aria-disabled={index <= 0}
        aria-label={previousLabel}
        className={edgeClasses}
        onClick={onPrevious}
        size="md"
      >
        <ChevronLeft aria-hidden className="size-4.5" />
      </IconButton>
      <IconButton
        aria-disabled={index >= total - 1}
        aria-label={nextLabel}
        className={edgeClasses}
        onClick={onNext}
        size="md"
      >
        <ChevronRight aria-hidden className="size-4.5" />
      </IconButton>
    </>
  )
}

export default StepSheetHeader
