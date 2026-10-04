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
  // The button that opened the editor, read at first render — before the effect
  // below moves focus (a dev StrictMode re-run would otherwise see the editor)
  const openerRef = useRef(
    typeof document !== 'undefined' && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  )
  const { draft, errors, setField, validate } = useProblemDraft(initialDraft)

  useEffect(() => {
    const root = rootRef.current
    const opener = openerRef.current

    root?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Keyboard users land in the editor, not on the (now disabled) button that opened it
    root?.querySelector<HTMLElement>('button, input, textarea')?.focus({ preventScroll: true })

    return () => {
      // …and go back to that button once the editor closes — a tick later, when
      // it's no longer disabled
      setTimeout(() => {
        if (opener?.isConnected && document.activeElement === document.body) {
          opener.focus({ preventScroll: true })
        }
      })
    }
  }, [])

  const handleDone = () => {
    const problem = validate()

    if (problem) return onDone(problem)

    // Errors render on the next commit — then bring the first one into view
    requestAnimationFrame(() =>
      rootRef.current
        ?.querySelector('[data-field-error]')
        ?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    )
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
            error={errors.aspects ? t('admin.forecast.editor.problems.errors.aspects') : undefined}
            hint={t('admin.forecast.editor.problems.aspectsHint')}
            label={t('admin.forecast.editor.problems.aspects')}
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
