import { useEffect } from 'react'

type FormStateListeners = {
  onDirtyChange?: (isDirty: boolean) => void
  onSubmittingChange?: (isSubmitting: boolean) => void
}

// A form inside a sheet tells its host about unsaved input and a running save —
// the host owns the footer buttons and the "discard?" question
const useReportFormState = (
  { isDirty, isSubmitting }: { isDirty: boolean; isSubmitting: boolean },
  { onDirtyChange, onSubmittingChange }: FormStateListeners,
) => {
  useEffect(() => {
    onDirtyChange?.(isDirty)
  }, [isDirty, onDirtyChange])

  useEffect(() => {
    onSubmittingChange?.(isSubmitting)
  }, [isSubmitting, onSubmittingChange])
}

export default useReportFormState
