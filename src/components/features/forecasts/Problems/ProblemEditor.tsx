'use client'

import { useEffect, useRef } from 'react'
import { AspectElevationPicker } from '@components/features/observations'
import { Button, Field, FieldGroup, Textarea } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import ProblemEditorFields from './ProblemEditorFields'
import ProblemNumber from './ProblemNumber'
import type { ProblemDraft, ProblemValues } from './problemSchema'
import useProblemDraft from './useProblemDraft'

type ProblemEditorProps = {
  initialDraft: ProblemDraft
  isNew: boolean
  number: number
  onCancel: VoidFunction
  onDone: (problem: ProblemValues) => void
}

// Edits one problem in place. Nothing is saved here: Done hands the problem to
// the forecast form, which saves it with the forecast.
const ProblemEditor = ({ initialDraft, isNew, number, onCancel, onDone }: ProblemEditorProps) => {
  const t = useTranslations()
  const rootRef = useRef<HTMLDivElement>(null)
  const { draft, errors, setField, validate } = useProblemDraft(initialDraft)

  useEffect(() => {
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleDone = () => {
    const problem = validate()

    if (problem) onDone(problem)
  }

  return (
    <div
      ref={rootRef}
      className="border-accent ring-accent-soft flex scroll-mt-22.5 flex-col gap-5 rounded-[14px] border-[1.5px] px-4.5 pt-4 pb-4.5 ring-4"
    >
      <div className="flex items-center gap-2.5">
        <ProblemNumber number={number} />
        <h3 className="text-copy-lg text-ink font-semibold">
          {t(isNew ? 'admin.forecast.editor.problems.new' : 'admin.forecast.editor.problems.edit')}
        </h3>
        <span className="text-caption text-muted ml-auto">
          {t('admin.forecast.editor.problems.partOfForecast')}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-2">
        <ProblemEditorFields draft={draft} errors={errors} setField={setField} />
        <div className="flex flex-col gap-5">
          <FieldGroup
            hint={t('admin.forecast.editor.problems.aspectsHint')}
            label={t('admin.forecast.editor.problems.aspects')}
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

      <div className="border-rule flex flex-wrap items-center gap-3 border-t pt-4">
        <p className="text-caption text-muted mr-auto">
          {t('admin.forecast.editor.problems.keptNote')}
        </p>
        <Button onClick={onCancel} size="sm" variant="secondary">
          {t('common.actions.cancel')}
        </Button>
        <Button className="bg-ink hover:bg-ink/90" onClick={handleDone} size="sm">
          {t('admin.forecast.editor.problems.done')}
        </Button>
      </div>
    </div>
  )
}

export default ProblemEditor
