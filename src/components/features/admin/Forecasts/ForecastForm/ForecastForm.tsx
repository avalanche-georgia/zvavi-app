'use client'

import { useToast, useUnsavedChangesWarning } from '@components/hooks'
import { Button, TextInput } from '@components/ui'
import type { ForecastFormData } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import { useForecastFormSubmit } from './hooks'

import { InputBlock } from './common'
import AdditionalTextFields from './AdditionalTextFields'
import { HazardLevels } from './HazardLevels'
import { ProblemsSection } from './ProblemsSection'
import { RecentAvalanchesSection } from './RecentAvalanchesSection'
import { type ForecastFormSchema, forecastFormSchema } from './schema'
import TextAreaField from './TextAreaField'
import ValidUntil from './ValidUntil'

type ForecastFormProps = {
  initialFormData: ForecastFormData
  onCancel: VoidFunction
  onSuccess: VoidFunction
}

const convertToFormSchema = (data: ForecastFormData): ForecastFormSchema => ({
  additionalHazards: data.baseFormData.additionalHazards,
  avalancheProblems: data.forecastDetails.avalancheProblems,
  forecaster: data.baseFormData.forecaster,
  hazardLevels: data.baseFormData.hazardLevels,
  recentAvalanches: data.forecastDetails.recentAvalanches,
  snowpack: data.baseFormData.snowpack,
  summary: data.baseFormData.summary,
  validUntil: data.baseFormData.validUntil,
  weather: data.baseFormData.weather,
})

const ForecastForm = ({ initialFormData, onCancel, onSuccess }: ForecastFormProps) => {
  const t = useTranslations()
  const tForecast = useTranslations('admin.forecast')
  const { toastError } = useToast()

  const form = useForm<ForecastFormSchema>({
    defaultValues: convertToFormSchema(initialFormData),
    resolver: zodResolver(forecastFormSchema),
  })

  const {
    formState: { errors, isDirty },
    register,
  } = form

  useUnsavedChangesWarning(isDirty)

  const { handleSubmit } = useForecastFormSubmit({
    initialForecastId: initialFormData.baseFormData.id,
    onSuccess,
  })

  const onSubmit = () => {
    form.handleSubmit(handleSubmit, (validationErrors) => {
      toastError('ForecastForm validation', { error: validationErrors })
    })()
  }

  const getError = (field: keyof ForecastFormSchema) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="rounded-lg bg-white shadow">
        <section className="flex w-full flex-col gap-3 p-4 md:p-6 ">
          <form className="flex w-full flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">{tForecast('form.general.title')}</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6">
                <InputBlock
                  error={getError('forecaster')}
                  label={tForecast('form.general.labels.forecaster')}
                  required
                >
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  <TextInput className="flex-1" {...register('forecaster')} />
                </InputBlock>

                <ValidUntil error={getError('validUntil')} />
              </div>
            </div>

            <TextAreaField type="summary" />
            <hr />
            <HazardLevels />
            <hr />
            <ProblemsSection />
            <hr />
            <RecentAvalanchesSection />
            <hr />
            <AdditionalTextFields />
          </form>
        </section>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onCancel} variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button onClick={onSubmit}>{t('common.actions.submit')}</Button>
        </footer>
      </div>
    </FormProvider>
  )
}

export default ForecastForm
