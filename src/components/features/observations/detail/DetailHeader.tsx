import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

type DetailHeaderProps = {
  // null when the open observation isn't in the current (filtered) list
  index: number | null
  onNext: VoidFunction
  onPrevious: VoidFunction
  total: number
  typeLabel: string
}

const DetailHeader = ({ index, onNext, onPrevious, total, typeLabel }: DetailHeaderProps) => {
  const t = useTranslations()

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X className="size-4.5" />
      </SheetClose>
      <SheetTitle className="sr-only">{typeLabel}</SheetTitle>
      <span className="text-muted flex-1 text-[13px]">
        {index !== null && t('observations.detail.position', { current: index + 1, total })}
      </span>
      <SheetIconButton
        aria-label={t('observations.detail.previous')}
        disabled={index === null || index <= 0}
        onClick={onPrevious}
      >
        <ChevronLeft className="size-4.5" />
      </SheetIconButton>
      <SheetIconButton
        aria-label={t('observations.detail.next')}
        disabled={index === null || index >= total - 1}
        onClick={onNext}
      >
        <ChevronRight className="size-4.5" />
      </SheetIconButton>
    </>
  )
}

export default DetailHeader
