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
  // The panel stays mounted (open / closed) so it slides in and out like other
  // sheets — base-ui only animates an open change, not a dialog mounted open
  isOpen: boolean
  number: number
  onCancel: VoidFunction
  onDone: (problem: ProblemValues) => void
  // Changes each time the editor opens: the draft starts over
  session: number
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
  session,
}: ProblemEditorProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { draft, errors, setField, validate } = useProblemDraft(initialDraft, session)
  const [isConfirmingDiscard, setIsConfirmingDiscard] = useState(false)
  const isDirty = !isEqual(draft, initialDraft)

  // Close button, Esc, backdrop: unsaved edits are never dropped without asking
  const requestClose = () => (isDirty ? setIsConfirmingDiscard(true) : onCancel())
  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && requestClose()

  const handleDiscard = () => {
    setIsConfirmingDiscard(false)
    onCancel()
  }

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
          onDiscard={handleDiscard}
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
