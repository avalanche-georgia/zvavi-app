import { useMemo, useSyncExternalStore } from 'react'

import type { ObservationSubmitFormSchema } from './schema'

export type SubmitterDetails = Pick<
  ObservationSubmitFormSchema,
  'submitterContact' | 'submitterEducation' | 'submitterName'
>

// Opt-in ("Remember my details on this device"): kept in this browser only,
// never sent anywhere except as part of a report. Stale 12 months after the
// last save. Storage can be unavailable (private mode, blocked site data) —
// it's a convenience, so every access fails silently.
const storageKey = 'observation-submitter'
const maxAgeMs = 365 * 24 * 60 * 60 * 1000

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((listener) => listener())

const readRaw = () => {
  try {
    return localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

const toOptionalString = (value: unknown) => (typeof value === 'string' && value ? value : null)

const parseDetails = (raw: string | null): SubmitterDetails | null => {
  try {
    const stored = JSON.parse(raw ?? 'null')

    if (!stored || typeof stored.submitterName !== 'string' || !stored.submitterName) return null
    if (!(Date.now() - Date.parse(stored.savedAt) < maxAgeMs)) return null

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
    notify()
  } catch {
    // Not saved — the form simply won't be prefilled next time
  }
}

export const forgetSubmitterDetails = () => {
  try {
    localStorage.removeItem(storageKey)
    notify()
  } catch {
    // Nothing stored we could reach
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

// Saved details, or null. Always null during server rendering and hydration.
export const useSavedSubmitterDetails = () => {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null)

  return useMemo(() => parseDetails(raw), [raw])
}
