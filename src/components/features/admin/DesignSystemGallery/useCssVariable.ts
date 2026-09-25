import { useEffect, useState } from 'react'

// Resolved value of a CSS custom property on :root (e.g. '--color-ink' → '#1b1a1e')
export const useCssVariable = (name: string) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])

  return value
}
