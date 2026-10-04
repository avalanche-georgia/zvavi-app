'use client'

import { useRef, useState } from 'react'
import { Sheet } from '@components/ui'
import isEqual from 'lodash/isEqual'

import ProblemEditorBody from './ProblemEditorBody'
import ProblemEditorFooter from './ProblemEditorFooter'
import ProblemEditorHeader from './ProblemEditorHeader'
import type { ProblemDraft, ProblemValues } from './problemSchema'
import useProblemDraft from './useProblemDraft'

type ProblemEditorProps = {
  initialDraft: ProblemDraft
  isNew: boolean
  // Kept mounted while closing so the panel slides out with its content
  isOpen: boolean
  number: number
  onCancel: VoidFunction
  onDone: (problem: ProblemValues) => void
}

// Edits one problem in a side panel (bottom sheet on mobile), like the avalanche
// record panel. Nothing is saved here: Done hands the problem to the forecast
// form, which saves it with the forecast.
const ProblemEditor = ({
  initialDraft,
  isNew,
  isOpen,
  number,
  onCancel,
  onDone,
}: ProblemEditorProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { draft, errors, setField, validate } = useProblemDraft(initialDraft)
  const [isConfirmingDiscard, setIsConfirmingDiscard] = useState(false)
  const isDirty = !isEqual(draft, initialDraft)

  // Close button, Esc, backdrop: unsaved edits are never dropped without asking
  const requestClose = () => (isDirty ? setIsConfirmingDiscard(true) : onCancel())
  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && requestClose()

  const handleDone = () => {
    const problem = validate()

    if (problem) return onDone(problem)

    // Errors render on the next commit — then bring the first one into view
    setTimeout(() =>
      bodyRef.current
        ?.querySelector('[data-field-error]')
        ?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    )
  }

  return (
    <Sheet
      className="lg:w-200"
      footer={
        <ProblemEditorFooter
          isConfirmingDiscard={isConfirmingDiscard}
          onCancel={requestClose}
          onDiscard={onCancel}
          onDone={handleDone}
          onKeepEditing={() => setIsConfirmingDiscard(false)}
        />
      }
      header={<ProblemEditorHeader isNew={isNew} number={number} />}
      isDismissible={!isDirty}
      isOpen={isOpen}
      isTall
      onOpenChange={handleOpenChange}
    >
      <div ref={bodyRef}>
        <ProblemEditorBody draft={draft} errors={errors} setField={setField} />
      </div>
    </Sheet>
  )
}

export default ProblemEditor
