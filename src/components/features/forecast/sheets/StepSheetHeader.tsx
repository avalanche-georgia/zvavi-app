import { SheetHeader, SheetStepButtons, type SheetSteps } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type StepSheetHeaderProps = {
  nextLabel: string
  // e.g. "Problem 1 of 2"
  positionLabel: string
  previousLabel: string
  steps: SheetSteps
  // Accessible name of the sheet
  title: string
}

// Header of a sheet that steps through a list: × · position · previous / next
const StepSheetHeader = ({
  nextLabel,
  positionLabel,
  previousLabel,
  steps,
  title,
}: StepSheetHeaderProps) => {
  const t = useTranslations()

  return (
    <SheetHeader
      closeLabel={t('common.actions.close')}
      isTitleHidden
      subtitle={positionLabel}
      title={title}
    >
      <SheetStepButtons nextLabel={nextLabel} previousLabel={previousLabel} steps={steps} />
    </SheetHeader>
  )
}

export default StepSheetHeader
