'use client'

import { useEffect, useRef, useState } from 'react'
import { useCopyToClipboard, useEventCallback } from 'usehooks-ts'

import useToast from './useToast'

// `value` may be a function, for text that can only be built in the browser (window.location)
const useCopyWithFeedback = (value: string | (() => string)) => {
  const [isCopied, setIsCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [, copyToClipboard] = useCopyToClipboard()
  const { toastError } = useToast()

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = useEventCallback(async () => {
    // Refused (no permission, unfocused page): say so rather than show a false "Copied"
    const isWritten = await copyToClipboard(typeof value === 'function' ? value() : value)

    if (!isWritten) return void toastError('useCopyWithFeedback', {})

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }

    setIsCopied(true)
    resetTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
  })

  return { handleCopy, isCopied }
}

export default useCopyWithFeedback
