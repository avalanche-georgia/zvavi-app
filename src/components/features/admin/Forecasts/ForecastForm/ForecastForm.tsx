'use client'

import { Button, TextInput } from '@components/ui'
import type { ForecastFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useForecastFormState, useForecastFormSubmit } from './hooks'

import { InputBlock } from './common'
import AdditionalTextFields from './AdditionalTextFields'
import { HazardLevels } from './HazardLevels'
import { ProblemsSection } from './ProblemsSection'
import { RecentAvalanchesSection } from './RecentAvalanchesSection'
import TextAreaField from './TextAreaField'
import ValidUntil from './ValidUntil'

type ForecastFormProps = {
  initialFormData: ForecastFormData
  onCancel: VoidFunction
  onSuccess: VoidFunction
}

// TODO: Implement Validations https://app.asana.com/0/1208747689500826/1209084695587061/f
const ForecastForm = ({ initialFormData, onCancel, onSuccess }: ForecastFormProps) => {
  const t = useTranslations()
  const tForecast = useTranslations('admin.forecast')

  const {
    avalancheProblems,
    formData,
    handleTextFieldChange,
    recentAvalanches,
    setFormData,
    setProblems,
    setRecentAvalanches,
  } = useForecastFormState(initialFormData)

  const { handleSubmit } = useForecastFormSubmit({
    avalancheProblems,
    formData,
    initialForecastId: initialFormData.baseFormData.id,
    onSuccess,
    recentAvalanches,
  })

  return (
    <>
      <section className="flex w-full max-w-4xl flex-col gap-3 p-4 md:p-6">
        <form className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{tForecast('form.general.title')}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6">
              <InputBlock label={tForecast('form.general.labels.forecaster')}>
                <TextInput
                  className="flex-1"
                  onChange={handleTextFieldChange('forecaster')}
                  value={formData.forecaster}
                />
              </InputBlock>

              <ValidUntil formData={formData} setFormData={setFormData} />
            </div>
          </div>

          <TextAreaField
            formData={formData}
            onChange={handleTextFieldChange('summary')}
            type="summary"
          />
          <hr />
          <HazardLevels setFormData={setFormData} value={formData.hazardLevels} />
          <hr />
          <ProblemsSection problems={avalancheProblems} setProblems={setProblems} />
          <hr />
          <RecentAvalanchesSection
            avalanches={recentAvalanches}
            setAvalanches={setRecentAvalanches}
          />
          <hr />
          <AdditionalTextFields formData={formData} onChange={handleTextFieldChange} />
        </form>
      </section>

      <footer className="sticky bottom-0 flex h-16 items-center justify-end gap-4 border-t bg-white px-4 md:px-6">
        <Button onClick={onCancel}>{t('common.actions.cancel')}</Button>
        <Button onClick={handleSubmit}>{t('common.actions.submit')}</Button>
      </footer>
    </>
  )
}

export default ForecastForm
