import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ForecasterField from './ForecasterField'
import ValidUntilField from './ValidUntilField'

const GeneralCard = ({ sectionId }: { sectionId: string }) => {
  const t = useTranslations()

  return (
    <FormCard sectionId={sectionId} title={t('admin.forecast.editor.general.title')}>
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 min-[620px]:grid-cols-2 min-[620px]:items-start">
        <ForecasterField />
        <ValidUntilField />
      </div>
    </FormCard>
  )
}

export default GeneralCard
