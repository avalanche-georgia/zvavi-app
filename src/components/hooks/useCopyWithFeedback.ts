'use client'

import { useEffect, useRef, useState } from 'react'
import { useCopyToClipboard, useEventCallback } from 'usehooks-ts'

const useCopyWithFeedback = (value: string) => {
  const [isCopied, setIsCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const [, copyToClipboard] = useCopyToClipboard()

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const handleCopy = useEventCallback(async () => {
    await copyToClipboard(value)

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }

    setIsCopied(true)
    resetTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
  })

  return { handleCopy, isCopied }
}

export default useCopyWithFeedback
