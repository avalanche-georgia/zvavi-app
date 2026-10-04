'use client'

import { avalancheProblemTypes } from '@domain/constants'
import { FormCard } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import ProblemEditor from './ProblemEditor'
import ProblemList from './ProblemList'
import { emptyProblemDraft, type ProblemDraft, type ProblemValues } from './problemSchema'
import ProblemsEmpty from './ProblemsEmpty'
import useProblemsSection from './useProblemsSection'

type ProblemsSectionProps = {
  // The form blocks saving while an editor is open
  onEditingChange: (isEditing: boolean) => void
  sectionId: string
}

// A list entry without its field-array key
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toDraft = ({ fieldKey, ...problem }: ProblemValues & { fieldKey: string }) => problem

// Problems belong to this forecast: edited in a panel, saved with the forecast
const ProblemsSection = ({ onEditingChange, sectionId }: ProblemsSectionProps) => {
  const t = useTranslations()
  const { close, editing, fields, handleDelete, handleDone, move, open } =
    useProblemsSection(onEditingChange)
  const isEmpty = fields.length === 0
  const editedIndex = fields.findIndex((field) => field.fieldKey === editing?.key)
  const isNew = editedIndex === -1
  // Each type once per forecast: the edited problem keeps its own
  const takenTypes = fields
    .filter((_field, index) => index !== editedIndex)
    .map((field) => field.type)
  const isEveryTypeTaken = fields.length >= Object.keys(avalancheProblemTypes).length
  const initialDraft: ProblemDraft = isNew
    ? { ...emptyProblemDraft, order: fields.length }
    : toDraft(fields[editedIndex])

  return (
    <FormCard
      actions={
        !isEmpty && (
          <Button
            disabled={isEveryTypeTaken}
            onClick={() => open('new')}
            size="sm"
            variant="secondary"
          >
            <Plus aria-hidden className="size-4" />
            {t('admin.forecast.editor.problems.add')}
          </Button>
        )
      }
      description={t('admin.forecast.editor.problems.description')}
      sectionId={sectionId}
      title={t('admin.forecast.editor.problems.title')}
      titleTag={
        <span className="rounded-badge bg-tile text-micro text-muted px-1.5 py-0.5 font-semibold uppercase">
          {t('admin.forecast.editor.problems.scopeTag')}
        </span>
      }
    >
      {isEmpty ? (
        <ProblemsEmpty onAdd={() => open('new')} />
      ) : (
        <ProblemList onDelete={handleDelete} onEdit={open} onReorder={move} problems={fields} />
      )}
      <ProblemEditor
        initialDraft={initialDraft}
        isNew={isNew}
        isOpen={!!editing?.isOpen}
        number={isNew ? fields.length + 1 : editedIndex + 1}
        onCancel={close}
        onDone={handleDone}
        session={editing?.session ?? 0}
        takenTypes={takenTypes}
      />
    </FormCard>
  )
}

export default ProblemsSection
