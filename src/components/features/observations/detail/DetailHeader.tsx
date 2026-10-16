import { SheetHeader, SheetStepButtons, type SheetSteps } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type DetailHeaderProps = {
  // null when the open observation isn't in the current (filtered) list
  index: number | null
  steps: SheetSteps
  total: number
  typeLabel: string
}

const DetailHeader = ({ index, steps, total, typeLabel }: DetailHeaderProps) => {
  const t = useTranslations()

  return (
    <SheetHeader
      closeLabel={t('common.actions.close')}
      isTitleHidden
      subtitle={index !== null && t('observations.detail.position', { current: index + 1, total })}
      title={typeLabel}
    >
      <SheetStepButtons
        nextLabel={t('observations.detail.next')}
        previousLabel={t('observations.detail.previous')}
        steps={steps}
      />
    </SheetHeader>
  )
}

export default DetailHeader
