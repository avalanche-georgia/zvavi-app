'use client'

import { useCopyWithFeedback } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button, TextInput } from '@components/ui'
import { AnimatePresence, motion } from 'motion/react'

const CopyInput = ({ value }: { value: string }) => {
  const { handleCopy, isCopied } = useCopyWithFeedback(value)

  return (
    <div className="flex items-center gap-2">
      <TextInput className="flex-1 truncate" readOnly value={value} />

      <Button disabled={isCopied} onClick={handleCopy} variant="secondary">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isCopied ? 'copied' : 'copy'}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            initial={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Icon
              className={isCopied ? 'stroke-green-500' : undefined}
              icon={isCopied ? 'copyCheck' : 'copy'}
              size="sm"
            />
          </motion.span>
        </AnimatePresence>
      </Button>
    </div>
  )
}

export default CopyInput
