'use client'

import type { AvalancheSize } from '@domain/types'
import { ChipGroup, FieldGroup, SegmentedControl, ToggleGrid } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ProblemDraft } from './problemSchema'
import TimeOfDayField from './TimeOfDayField'
import type { ProblemDraftErrors, SetProblemDraftField } from './useProblemDraft'
import useProblemOptions from './useProblemOptions'

type ProblemEditorFieldsProps = {
  draft: ProblemDraft
  errors: ProblemDraftErrors
  setField: SetProblemDraftField
}

// Left column: what kind of problem and how it behaves
const ProblemEditorFields = ({ draft, errors, setField }: ProblemEditorFieldsProps) => {
  const t = useTranslations()
  const options = useProblemOptions()
  const labelKey = 'admin.forecast.form.problems.labels'
  const segmentClassName = 'h-9.5'

  return (
    <div className="flex flex-col gap-5">
      <FieldGroup
        error={errors.type ? t('admin.forecast.editor.problems.errors.type') : undefined}
        label={t(`${labelKey}.problemType`)}
        required
        requiredText={t('common.validation.required')}
      >
        <ChipGroup
          onChange={(type) => type && setField('type', type)}
          options={options.type}
          value={draft.type}
        />
      </FieldGroup>
      <FieldGroup
        error={errors.avalancheSize ? t('admin.forecast.editor.problems.errors.size') : undefined}
        label={t('admin.forecast.form.common.labels.avalancheSize')}
        required
        requiredText={t('common.validation.required')}
      >
        <ToggleGrid
          className="[&>*]:h-11"
          onChange={(size) => size && setField('avalancheSize', Number(size) as AvalancheSize)}
          options={options.size}
          value={draft.avalancheSize === null ? null : String(draft.avalancheSize)}
        />
      </FieldGroup>
      <FieldGroup label={t(`${labelKey}.sensitivity`)}>
        <SegmentedControl
          ariaLabel={t(`${labelKey}.sensitivity`)}
          className={segmentClassName}
          onChange={(value) => setField('sensitivity', value)}
          options={options.sensitivity}
          value={draft.sensitivity}
        />
      </FieldGroup>
      <FieldGroup label={t(`${labelKey}.distribution`)}>
        <SegmentedControl
          ariaLabel={t(`${labelKey}.distribution`)}
          className={segmentClassName}
          onChange={(value) => setField('distribution', value)}
          options={options.distribution}
          value={draft.distribution}
        />
      </FieldGroup>
      <FieldGroup label={t(`${labelKey}.trend`)}>
        <SegmentedControl
          ariaLabel={t(`${labelKey}.trend`)}
          className={segmentClassName}
          onChange={(value) => setField('trend', value)}
          options={options.trend}
          value={draft.trend}
        />
      </FieldGroup>
      <FieldGroup label={t(`${labelKey}.confidence`)}>
        <SegmentedControl
          ariaLabel={t(`${labelKey}.confidence`)}
          className={segmentClassName}
          onChange={(value) => setField('confidence', value)}
          options={options.confidence}
          value={draft.confidence}
        />
      </FieldGroup>
      <TimeOfDayField draft={draft} setField={setField} />
    </div>
  )
}

export default ProblemEditorFields
