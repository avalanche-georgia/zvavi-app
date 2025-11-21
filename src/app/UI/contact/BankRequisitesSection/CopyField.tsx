'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCopyToClipboard, useEventCallback } from 'usehooks-ts'

import { IconButton } from '@/UI/components'

const CopyField = ({ label, value }: { label: string; value: string }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [, copyToClipboard] = useCopyToClipboard()

  const handleCopy = useEventCallback(async () => {
    await copyToClipboard(value)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1500)
  })

  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="flex items-center justify-between font-mono text-sm">
        <span>{value}</span>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isCopied ? 'copied' : 'copy'}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {isCopied ? (
              <IconButton
                aria-label="Copied"
                className="hover:stroke-unset stroke-green-500"
                iconProps={{ icon: 'copyCheck' }}
                onClick={handleCopy}
              />
            ) : (
              <IconButton aria-label="Copy" iconProps={{ icon: 'copy' }} onClick={handleCopy} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CopyField
