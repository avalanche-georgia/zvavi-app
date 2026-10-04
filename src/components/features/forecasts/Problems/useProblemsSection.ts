import { useEffect, useRef, useState } from 'react'
import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { useToast } from '@components/hooks'
import { useTranslations } from 'next-intl'
import { useFieldArray } from 'react-hook-form'

import type { ProblemValues } from './problemSchema'

// Which problem the inline editor is open for: a list key, or a new one
export type ProblemEditing = { key: string } | { key: 'new' } | null

// The forecast's problem list: one editor open at a time, delete with Undo
const useProblemsSection = (onEditingChange: (isEditing: boolean) => void) => {
  const t = useTranslations()
  const { toastAction, toastInfo } = useToast()
  const [editing, setEditing] = useState<ProblemEditing>(null)
  const { append, fields, insert, move, remove, update } = useFieldArray<
    ForecastFormSchema,
    'avalancheProblems',
    'fieldKey'
  >({ keyName: 'fieldKey', name: 'avalancheProblems' })

  // Undo runs later, against the list as it is then
  const fieldsRef = useRef(fields)

  useEffect(() => {
    fieldsRef.current = fields
  }, [fields])

  useEffect(() => {
    onEditingChange(editing !== null)
  }, [editing, onEditingChange])

  const open = (key: string) => {
    if (editing) {
      toastInfo(t('admin.forecast.editor.problems.finishFirst'))

      return
    }

    setEditing({ key })
  }

  const close = () => setEditing(null)

  const handleDone = (problem: ProblemValues) => {
    const index = fields.findIndex((field) => field.fieldKey === editing?.key)

    if (index === -1) {
      append(problem)
    } else {
      update(index, problem)
    }

    close()
  }

  const handleDelete = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fieldKey, ...problem } = fields[index]
    const previousKey = fields[index - 1]?.fieldKey

    // Back after the problem it followed, even if the list was reordered since
    const restore = () => {
      const current = fieldsRef.current
      const previousIndex = current.findIndex((field) => field.fieldKey === previousKey)

      if (previousIndex !== -1) return insert(previousIndex + 1, problem)

      insert(Math.min(index, current.length), problem)
    }

    remove(index)
    toastAction(
      t('admin.forecast.editor.problems.removed', {
        type: t(`common.avalancheTypes.${problem.type}`),
      }),
      { label: t('common.actions.undo'), onClick: restore },
    )
  }

  return { close, editing, fields, handleDelete, handleDone, move, open }
}

export default useProblemsSection
