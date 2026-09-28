import { useEffect, useRef, useState } from 'react'

const errorSelector = '[data-field-error]'
const focusableSelector =
  'input:not([type="hidden"]), textarea, button, [tabindex]:not([tabindex="-1"])'

// Stop waiting if no error message shows up (e.g. the form turned out valid)
const waitTimeoutMs = 1000
// Scroll once the form stops changing: further error messages and card
// borders rendering mid-animation would cancel a smooth scroll
const settleDelayMs = 80

// The Leaflet map inside the form mutates its own DOM all the time (tiles,
// animations) — those changes say nothing about the form's layout settling
const isInsideMap = (record: MutationRecord) => {
  const element = record.target instanceof Element ? record.target : record.target.parentElement

  return !!element?.closest('.leaflet-container')
}

const scrollToField = (errorElement: Element) => {
  const field = errorElement.parentElement

  if (!field) return

  field.scrollIntoView({ behavior: 'smooth', block: 'center' })
  field.querySelector<HTMLElement>(focusableSelector)?.focus({ preventScroll: true })
}

// RHF can only focus inputs it holds a ref to, and most fields here (chips,
// map, photos) are controlled components without one. Instead, find the first
// rendered error message in DOM order and bring its field into view.
// Error messages come from fields subscribed via useFormState, which render
// over a few commits after the submit — so on the first failed submit, watch
// the form until errors appear and the layout settles.
const useScrollToFirstError = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [scrollRequestCount, setScrollRequestCount] = useState(0)

  useEffect(() => {
    const form = formRef.current

    if (scrollRequestCount === 0 || !form) return

    let settleTimeout: ReturnType<typeof setTimeout> | undefined

    const scrollWhenSettled = () => {
      if (!form.querySelector(errorSelector)) return

      clearTimeout(settleTimeout)
      settleTimeout = setTimeout(() => {
        observer.disconnect()

        const error = form.querySelector(errorSelector)

        if (error) scrollToField(error)
      }, settleDelayMs)
    }

    const observer = new MutationObserver((records) => {
      if (records.every(isInsideMap)) return

      scrollWhenSettled()
    })
    const giveUpTimeout = setTimeout(() => observer.disconnect(), waitTimeoutMs)

    // class: red borders on invalid fields/cards. Not every attribute — photo
    // progress bars update their style continuously during uploads.
    observer.observe(form, { attributeFilter: ['class'], childList: true, subtree: true })
    // Errors already on screen (a repeated submit) — nothing more may change
    scrollWhenSettled()

    return () => {
      observer.disconnect()
      clearTimeout(settleTimeout)
      clearTimeout(giveUpTimeout)
    }
  }, [scrollRequestCount])

  const scrollToFirstError = () => setScrollRequestCount((count) => count + 1)

  return { formRef, scrollToFirstError }
}

export default useScrollToFirstError
