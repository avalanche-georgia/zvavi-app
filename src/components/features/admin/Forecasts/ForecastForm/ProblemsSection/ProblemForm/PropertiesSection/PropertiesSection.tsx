import { RadioGroup } from '@components/ui'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import TimeOfDay from './TimeOfDay'
import { InputBlock, useProblemOptions } from '../../../common'
import type { ProblemFormData } from '../ProblemForm'

type PropsSectionProps = {
  onRadioChange: (field: keyof Problem) => (value: string | number) => void
  problemData: ProblemFormData
  setProblemData: (value: React.SetStateAction<ProblemFormData>) => void
}

const PropertiesSection = ({ onRadioChange, problemData, setProblemData }: PropsSectionProps) => {
  const tProblems = useTranslations('admin.forecast.form.problems')
  const { confidenceOptions, distributionOptions, sensitivityOptions, trendOptions } =
    useProblemOptions()

  return (
    <section className="flex flex-col gap-4">
      <TimeOfDay onTimeChange={setProblemData} problemData={problemData} />

      <InputBlock label={tProblems('labels.sensitivity')}>
        <RadioGroup
          onChange={onRadioChange('sensitivity')}
          options={sensitivityOptions}
          value={problemData.sensitivity}
        />
      </InputBlock>

      <InputBlock label={tProblems('labels.distribution')}>
        <RadioGroup
          onChange={onRadioChange('distribution')}
          options={distributionOptions}
          value={problemData.distribution}
        />
      </InputBlock>

      <InputBlock label={tProblems('labels.trend')}>
        <RadioGroup
          onChange={onRadioChange('trend')}
          options={trendOptions}
          value={problemData.trend}
        />
      </InputBlock>

      <InputBlock label={tProblems('labels.confidence')}>
        <RadioGroup
          onChange={onRadioChange('confidence')}
          options={confidenceOptions}
          value={problemData.confidence}
        />
      </InputBlock>
    </section>
  )
}

export default PropertiesSection
