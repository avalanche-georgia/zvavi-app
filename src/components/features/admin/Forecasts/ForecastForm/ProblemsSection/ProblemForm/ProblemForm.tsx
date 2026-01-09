'use client'

import { useCallback, useState } from 'react'
import { Textarea } from '@components/ui'
import type { AvalancheProblemTypes, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { ProblemTypeProps } from './ProblemType'
import ProblemType from './ProblemType'
import { PropertiesSection } from './PropertiesSection'
import { Aspects, AvalancheSize, Footer, type SetAspectsData } from '../../common'

export type ProblemFormData = Omit<Problem, 'type'> & { type?: AvalancheProblemTypes }

export type ProblemFormProps = {
  onClose: VoidFunction
  onSave: (data: Problem) => void
  problemData: ProblemFormData
} & Pick<ProblemTypeProps, 'selectedProblemTypes'>

const ProblemForm = ({ onClose, onSave, problemData, selectedProblemTypes }: ProblemFormProps) => {
  const tProblems = useTranslations('admin.forecast.form.problems')

  const [data, setData] = useState(problemData)

  const handleDescriptionChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prev) => ({
        ...prev,
        description: target.value,
      }))
    },
    [setData],
  )

  const handleRadioChange = useCallback(
    (field: keyof Problem) => (value: string | number) => {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }))
    },
    [setData],
  )

  const handleSave = () => {
    onSave(data as Problem)
    onClose()
  }

  return (
    <div className="flex flex-col gap-10 rounded border p-3">
      <section className="grid grid-cols-2 items-start gap-x-6">
        <div className="flex flex-col gap-3">
          <ProblemType
            onTypeChange={setData}
            problemData={data}
            selectedProblemTypes={selectedProblemTypes}
          />
          <AvalancheSize onChange={handleRadioChange('avalancheSize')} value={data.avalancheSize} />
        </div>

        <Aspects data={data} setData={setData as SetAspectsData} />
      </section>

      <section className="grid grid-cols-2 gap-x-6">
        <div className="flex flex-col gap-4 pt-1.5">
          <h4 className="w-32 font-semibold">{tProblems('labels.description')}</h4>
          <Textarea
            className="w-full"
            onChange={handleDescriptionChange}
            rows={9}
            value={data.description}
          />
        </div>

        <PropertiesSection
          onRadioChange={handleRadioChange}
          problemData={data}
          setProblemData={setData}
        />
      </section>

      <Footer onCancel={onClose} onSave={handleSave} />
    </div>
  )
}

export default ProblemForm
