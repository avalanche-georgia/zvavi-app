'use client'

import { FormCard } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import ProblemEditor from './ProblemEditor'
import ProblemList from './ProblemList'
import { emptyProblemDraft } from './problemSchema'
import ProblemsEmpty from './ProblemsEmpty'
import useProblemsSection from './useProblemsSection'

type ProblemsSectionProps = {
  // The form blocks saving while an editor is open
  onEditingChange: (isEditing: boolean) => void
  sectionId: string
}

// Problems belong to this forecast: edited in place, saved with the forecast
const ProblemsSection = ({ onEditingChange, sectionId }: ProblemsSectionProps) => {
  const t = useTranslations()
  const { close, editing, fields, handleDelete, handleDone, move, open } =
    useProblemsSection(onEditingChange)
  const isEmpty = fields.length === 0 && editing === null

  return (
    <FormCard
      actions={
        !isEmpty && (
          <Button
            disabled={editing !== null}
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
        <div className="flex flex-col gap-3">
          <ProblemList
            editing={editing}
            onCancel={close}
            onDelete={handleDelete}
            onDone={handleDone}
            onEdit={open}
            onReorder={move}
            problems={fields}
          />
          {editing?.key === 'new' && (
            <ProblemEditor
              initialDraft={{ ...emptyProblemDraft, order: fields.length }}
              isNew
              number={fields.length + 1}
              onCancel={close}
              onDone={handleDone}
            />
          )}
        </div>
      )}
    </FormCard>
  )
}

export default ProblemsSection
