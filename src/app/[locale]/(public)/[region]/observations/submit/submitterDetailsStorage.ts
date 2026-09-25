import type { ObservationSubmitFormSchema } from './schema'

export type SubmitterDetails = Pick<
  ObservationSubmitFormSchema,
  'submitterContact' | 'submitterEducation' | 'submitterName'
>

// Kept on this device only (never sent until the next submit) so repeat
// reporters skip "About you". Stale after a year.
const storageKey = 'observation-submitter'
const maxAgeMs = 365 * 24 * 60 * 60 * 1000

const toOptionalString = (value: unknown) => (typeof value === 'string' && value ? value : null)

// Storage can be unavailable (private mode, blocked site data) — treat it as a
// convenience and fail silently
export const loadSubmitterDetails = (): SubmitterDetails | null => {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? 'null')

    if (!stored || typeof stored.submitterName !== 'string' || !stored.submitterName) return null

    if (!(Date.now() - Date.parse(stored.savedAt) < maxAgeMs)) {
      localStorage.removeItem(storageKey)

      return null
    }

    return {
      submitterContact: toOptionalString(stored.submitterContact),
      submitterEducation: toOptionalString(stored.submitterEducation),
      submitterName: stored.submitterName,
    }
  } catch {
    return null
  }
}

export const saveSubmitterDetails = (details: SubmitterDetails) => {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ ...details, savedAt: new Date().toISOString() }),
    )
  } catch {
    // Not saved — the form simply won't be prefilled next time
  }
}
