'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCopyToClipboard, useEventCallback } from 'usehooks-ts'

import { IconButton } from '@/UI/components'

const CopyField = ({ label, value }: { label: string; value: string }) => {
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

  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="flex items-center justify-between font-mono text-sm">
        <span>{value}</span>

        <AnimatePresence initial={false} mode="wait">
          {isCopied ? (
            <motion.div
              key="copied"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <IconButton
                aria-label="Copied"
                className="pointer-events-none stroke-green-500"
                iconProps={{ icon: 'copyCheck' }}
                onClick={handleCopy}
              />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <IconButton aria-label="Copy" iconProps={{ icon: 'copy' }} onClick={handleCopy} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CopyField
