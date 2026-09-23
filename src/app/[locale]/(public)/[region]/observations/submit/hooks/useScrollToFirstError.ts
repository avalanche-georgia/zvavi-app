import { useEffect, useRef, useState } from 'react'

const focusableSelector =
  'input:not([type="hidden"]), textarea, button, [tabindex]:not([tabindex="-1"])'

// RHF can only focus inputs it holds a ref to, and most fields here (selects,
// date picker, photos) are controlled components without one. Instead, find the
// first rendered error message in DOM order and bring its field into view.
// The scroll runs in an effect so it sees the error messages from the same
// render that received the new errors.
const useScrollToFirstError = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [scrollRequestCount, setScrollRequestCount] = useState(0)

  useEffect(() => {
    if (scrollRequestCount === 0) return

    const field = formRef.current?.querySelector('[data-field-error]')?.parentElement

    if (!field) return

    field.scrollIntoView({ behavior: 'smooth', block: 'center' })
    field.querySelector<HTMLElement>(focusableSelector)?.focus({ preventScroll: true })
  }, [scrollRequestCount])

  const scrollToFirstError = () => setScrollRequestCount((count) => count + 1)

  return { formRef, scrollToFirstError }
}

export default useScrollToFirstError
