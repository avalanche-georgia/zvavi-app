'use client'

import { useState } from 'react'

import { parseTime } from './parseTime'
import { matchesTime } from './timeOptions'

type UseTimeFieldParams = {
  onValueChange: (time: string | null) => void
  value: string | null
}

// The text being typed into a TimeField. Picking a listed time applies it at once;
// typed text applies on Enter or when the field loses focus, and anything that
// isn't a time goes back to the last value. An emptied field clears it.
const useTimeField = ({ onValueChange, value }: UseTimeFieldParams) => {
  const [draft, setDraft] = useState<string | null>(null)
  // A listed time highlighted with the arrow keys: Enter picks it, not the typed text
  const [highlighted, setHighlighted] = useState<string | undefined>()
  const [shownValue, setShownValue] = useState(value)
  const isInvalid = !!draft?.trim() && parseTime(draft) === null

  // A new value from outside (a form reset, a date shortcut) drops a half-typed time
  if (value !== shownValue) {
    setShownValue(value)
    setDraft(null)
  }

  const apply = (time: string | null) => {
    if (time !== value) onValueChange(time)
    setDraft(null)
  }

  const commit = () => {
    if (draft === null) return
    if (!draft.trim()) return apply(null)

    const time = parseTime(draft)

    if (time) apply(time)
    else setDraft(null)
  }

  const handleTextChange = (text: string, reason: string) => {
    if (reason === 'item-press') apply(text)
    else setDraft(text)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && draft !== null && !highlighted) {
      // Applies the time; inside a form it must not submit it too
      event.preventDefault()
      commit()
    }

    // Puts the last time back; base-ui also closes the list
    if (event.key === 'Escape') setDraft(null)
  }

  return {
    commit,
    // The list narrows only while typing; opened on a set time, it shows them all
    filterTime: (time: string, query: string) => draft === null || matchesTime(time, query),

    handleKeyDown,

    handleTextChange,

    isInvalid,
    setHighlighted,
    text: draft ?? value ?? '',
  }
}

export default useTimeField
