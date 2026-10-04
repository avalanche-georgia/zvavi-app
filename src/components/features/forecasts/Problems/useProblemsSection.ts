import { useEffect, useRef, useState } from 'react'
import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { useToast } from '@components/hooks'
import { useTranslations } from 'next-intl'
import { useFieldArray } from 'react-hook-form'

import type { ProblemValues } from './problemSchema'

// The problem being edited in the panel — a list key, or 'new'. `session` gives
// each opening a fresh draft; the entry stays after closing so the panel can
// slide out with its content.
export type ProblemEditing = { isOpen: boolean; key: string; session: number } | null

// The forecast's problem list: edited in a panel, deleted with Undo
const useProblemsSection = (onEditingChange: (isEditing: boolean) => void) => {
  const t = useTranslations()
  const { toastAction } = useToast()
  const [editing, setEditing] = useState<ProblemEditing>(null)
  const { append, fields, insert, move, remove, update } = useFieldArray<
    ForecastFormSchema,
    'avalancheProblems',
    'fieldKey'
  >({ keyName: 'fieldKey', name: 'avalancheProblems' })
  const isEditing = !!editing?.isOpen

  // Undo runs later, against the list as it is then
  const fieldsRef = useRef(fields)

  useEffect(() => {
    fieldsRef.current = fields
  }, [fields])

  useEffect(() => {
    onEditingChange(isEditing)
  }, [isEditing, onEditingChange])

  const open = (key: string) =>
    setEditing((previous) => ({ isOpen: true, key, session: (previous?.session ?? 0) + 1 }))

  const close = () => setEditing((previous) => previous && { ...previous, isOpen: false })

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
