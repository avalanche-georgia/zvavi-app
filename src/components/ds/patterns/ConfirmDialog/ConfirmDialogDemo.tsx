'use client'

import { useState } from 'react'

import ConfirmDialog from './ConfirmDialog'
import type { ConfirmDialogTone } from './confirmDialogTones'
import { Button } from '../../primitives'

const noop = () => undefined

type ConfirmDialogDemoProps = {
  children?: React.ReactNode
  confirmLabel: string
  label: string
  onConfirm?: () => Promise<unknown> | void
  pendingLabel?: string
  title: string
  tone: ConfirmDialogTone
}

// One gallery button opening its own ConfirmDialog
const ConfirmDialogDemo = ({
  children,
  confirmLabel,
  label,
  onConfirm = noop,
  pendingLabel,
  title,
  tone,
}: ConfirmDialogDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        {label}
      </Button>
      <ConfirmDialog
        cancelLabel={tone === 'warning' ? 'Keep editing' : 'Cancel'}
        closeLabel="Close"
        confirmLabel={confirmLabel}
        isOpen={isOpen}
        onConfirm={onConfirm}
        onOpenChange={setIsOpen}
        pendingLabel={pendingLabel}
        title={title}
        tone={tone}
      >
        {children}
      </ConfirmDialog>
    </>
  )
}

export default ConfirmDialogDemo
