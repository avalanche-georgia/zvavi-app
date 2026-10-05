'use client'

import { useState } from 'react'
import { HazardLevels } from '@components/features/forecasts/HazardLevels'
import { LinkedAvalanchesSection } from '@components/features/forecasts/LinkedAvalanches'
import { ProblemsSection } from '@components/features/forecasts/Problems'
import { useScrollToFirstError } from '@components/features/observations/form'
import { useUnsavedChangesWarning } from '@components/hooks'
import type { RegionId } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { useForecastFormSave, useForecastSavedNavigation, useSaveShortcut } from './hooks'

import ForecastActionBar from './ForecastActionBar'
import { type ForecastFormSchema, forecastFormSchema } from './schema'
import SectionRail from './SectionRail'
import { ConditionsCard, GeneralCard, SummaryCard } from './sections'
import { sectionIds } from './useSectionStatus'

type ForecastFormProps = {
  // Where Save & close goes; defaults to the region's list
  closeHref?: string
  // undefined for a new forecast (including a duplicate)
  forecastId?: number
  initialValues: ForecastFormSchema
  onClose: VoidFunction
  regionId: RegionId
}

const ForecastForm = ({
  closeHref,
  forecastId,
  initialValues,
  onClose,
  regionId,
}: ForecastFormProps) => {
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false)
  const form = useForm<ForecastFormSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(forecastFormSchema),
  })
  const { isDirty } = form.formState
  const { formRef, scrollToFirstError } = useScrollToFirstError()
  const handleSaved = useForecastSavedNavigation(regionId, closeHref)
  const saver = useForecastFormSave({
    form,
    initialForecastId: forecastId,
    onInvalid: scrollToFirstError,
    onSaved: handleSaved,
    regionId,
  })

  useUnsavedChangesWarning(isDirty)
  useSaveShortcut(() => saver.save(false))

  const handleCancel = () => (isDirty ? setIsConfirmingCancel(true) : onClose())

  // Layout breakpoints are container queries: the admin sidebar takes part of the screen

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <div className="@container">
        <div className="mx-auto grid max-w-280 grid-cols-1 gap-10 px-3 pt-4 pb-8 @min-[700px]:px-8 @min-[700px]:pt-7 @min-[1180px]:grid-cols-[minmax(0,880px)_200px]">
          <form
            ref={formRef}
            className="flex min-w-0 flex-col gap-4"
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <GeneralCard sectionId={sectionIds.general} />
            <HazardLevels sectionId={sectionIds.hazard} />
            <SummaryCard sectionId={sectionIds.summary} />
            <ProblemsSection
              onEditingChange={saver.setProblemEditorOpen}
              sectionId={sectionIds.problems}
            />
            <LinkedAvalanchesSection
              forecastId={saver.forecastId}
              regionId={regionId}
              sectionId={sectionIds.avalanches}
            />
            <ConditionsCard sectionId={sectionIds.conditions} />
            <ForecastActionBar
              isConfirmingCancel={isConfirmingCancel}
              isDirty={isDirty}
              isNew={saver.forecastId === undefined}
              isSaving={saver.isSaving}
              lastSavedAt={saver.lastSavedAt}
              onCancel={handleCancel}
              onCancelConfirm={onClose}
              onCancelDismiss={() => setIsConfirmingCancel(false)}
              onSave={() => saver.save(false)}
              onSaveAndClose={() => saver.save(true)}
            />
          </form>
          <SectionRail />
        </div>
      </div>
    </FormProvider>
  )
}

export default ForecastForm
