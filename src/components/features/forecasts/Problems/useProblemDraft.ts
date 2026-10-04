import { useState } from 'react'

import { type ProblemDraft, problemSchema, type ProblemValues } from './problemSchema'

export type ProblemDraftErrors = Partial<Record<'aspects' | 'avalancheSize' | 'type', boolean>>

export type SetProblemDraftField = <Key extends keyof ProblemDraft>(
  key: Key,
  value: ProblemDraft[Key],
) => void

// Local copy of the problem being edited: Cancel drops it, Done validates it.
// A new `session` (each time the editor opens) starts over from `initialDraft`.
const useProblemDraft = (initialDraft: ProblemDraft, session: number) => {
  const [draft, setDraft] = useState(initialDraft)
  const [errors, setErrors] = useState<ProblemDraftErrors>({})
  const [draftSession, setDraftSession] = useState(session)

  if (session !== draftSession) {
    setDraftSession(session)
    setDraft(initialDraft)
    setErrors({})
  }

  const setField: SetProblemDraftField = (key, value) => {
    setDraft((previous) => ({ ...previous, [key]: value }))
    if (key in errors) setErrors((previous) => ({ ...previous, [key]: false }))
  }

  // The valid problem, or null (errors shown) when type, size or aspects are missing
  const validate = (): ProblemValues | null => {
    const result = problemSchema.safeParse(draft)

    if (result.success) return result.data

    const paths = result.error.issues.map((issue) => issue.path[0])

    setErrors({
      aspects: paths.includes('aspects'),
      avalancheSize: paths.includes('avalancheSize'),
      type: paths.includes('type'),
    })

    return null
  }

  return { draft, errors, setField, validate }
}

export default useProblemDraft
