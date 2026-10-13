import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
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

// Header of a sheet that steps through a list: × · position · previous / next
const StepSheetHeader = (props: StepSheetHeaderProps) => {
  const { index, nextLabel, onNext, onPrevious, positionLabel, previousLabel, title, total } = props
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X aria-hidden className="size-4.5" />
      </SheetClose>
      <SheetTitle className="sr-only">{title}</SheetTitle>
      <span className="text-muted text-copy-sm flex-1">{positionLabel}</span>
      <SheetIconButton
        aria-disabled={index <= 0}
        aria-label={previousLabel}
        className={edgeClasses}
        onClick={onPrevious}
      >
        <ChevronLeft aria-hidden className="size-4.5" />
      </SheetIconButton>
      <SheetIconButton
        aria-disabled={index >= total - 1}
        aria-label={nextLabel}
        className={edgeClasses}
        onClick={onNext}
      >
        <ChevronRight aria-hidden className="size-4.5" />
      </SheetIconButton>
    </>
  )
}

export default StepSheetHeader
