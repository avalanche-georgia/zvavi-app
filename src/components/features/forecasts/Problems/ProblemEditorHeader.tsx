import { SheetHeader } from '@ds/patterns'
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
    <SheetHeader
      closeLabel={t('common.actions.close')}
      leading={<ProblemNumber number={number} />}
      title={t(isNew ? `${key}.new` : `${key}.edit`)}
    >
      <span className="text-caption text-muted pr-1 max-[480px]:hidden">
        {t(`${key}.partOfForecast`)}
      </span>
    </SheetHeader>
  )
}

export default ProblemEditorHeader
