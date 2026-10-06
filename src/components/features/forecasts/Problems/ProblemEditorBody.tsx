import { AspectElevationPicker } from '@components/features/observations'
import type { AvalancheProblemType } from '@domain/types'
import { Field, FieldGroup, Textarea } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import ProblemEditorFields from './ProblemEditorFields'
import type { ProblemDraft } from './problemSchema'
import type { ProblemDraftErrors, SetProblemDraftField } from './useProblemDraft'

type ProblemEditorBodyProps = {
  draft: ProblemDraft
  errors: ProblemDraftErrors
  setField: SetProblemDraftField
  takenTypes: AvalancheProblemType[]
}

// Two columns on desktop: the problem's properties, then where and the description
const ProblemEditorBody = ({ draft, errors, setField, takenTypes }: ProblemEditorBodyProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.problems'

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 px-4 py-4.5 lg:grid-cols-2 lg:px-5">
      <ProblemEditorFields
        draft={draft}
        errors={errors}
        setField={setField}
        takenTypes={takenTypes}
      />
      <div className="flex flex-col gap-5">
        <FieldGroup
          error={errors.aspects ? t(`${key}.errors.aspects`) : undefined}
          hint={t(`${key}.aspectsHint`)}
          label={t(`${key}.aspects`)}
          required
          requiredText={t('common.validation.required')}
        >
          <AspectElevationPicker
            onChange={(aspects) => setField('aspects', aspects)}
            value={draft.aspects}
          />
        </FieldGroup>
        <Field label={t('admin.forecast.form.problems.labels.description')}>
          <Textarea
            onValueChange={(description) => setField('description', description)}
            value={draft.description}
          />
        </Field>
      </div>
    </div>
  )
}

export default ProblemEditorBody
