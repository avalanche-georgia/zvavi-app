import { SheetClose, SheetIconButton, SheetTitle } from '@components/ui'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import ProblemNumber from './ProblemNumber'

type ProblemEditorHeaderProps = {
  isNew: boolean
  number: number
}

const ProblemEditorHeader = ({ isNew, number }: ProblemEditorHeaderProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.problems'

  return (
    <>
      <SheetClose render={<SheetIconButton aria-label={t('common.actions.close')} />}>
        <X className="size-4.5" />
      </SheetClose>
      <ProblemNumber number={number} />
      <SheetTitle className="m-0 flex-1 truncate text-[15px] font-semibold">
        {t(isNew ? `${key}.new` : `${key}.edit`)}
      </SheetTitle>
      <span className="text-caption text-muted pr-1 max-[480px]:hidden">
        {t(`${key}.partOfForecast`)}
      </span>
    </>
  )
}

export default ProblemEditorHeader
