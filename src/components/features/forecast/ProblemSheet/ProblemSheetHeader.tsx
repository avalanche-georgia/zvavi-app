import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type ProblemSheetHeaderProps = {
  index: number
  onNext: VoidFunction
  onPrevious: VoidFunction
  title: string
  total: number
}

// × · "Problem 1 of 2" · previous / next
const ProblemSheetHeader = ({
  index,
  onNext,
  onPrevious,
  title,
  total,
}: ProblemSheetHeaderProps) => {
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X aria-hidden className="size-4.5" />
      </SheetClose>
      <SheetTitle className="sr-only">{title}</SheetTitle>
      <span className="text-muted text-copy-sm flex-1">
        {t('forecast.page.problemPosition', { current: index + 1, total })}
      </span>
      <SheetIconButton
        aria-label={t('forecast.page.previousProblem')}
        disabled={index <= 0}
        onClick={onPrevious}
      >
        <ChevronLeft aria-hidden className="size-4.5" />
      </SheetIconButton>
      <SheetIconButton
        aria-label={t('forecast.page.nextProblem')}
        disabled={index >= total - 1}
        onClick={onNext}
      >
        <ChevronRight aria-hidden className="size-4.5" />
      </SheetIconButton>
    </>
  )
}

export default ProblemSheetHeader
