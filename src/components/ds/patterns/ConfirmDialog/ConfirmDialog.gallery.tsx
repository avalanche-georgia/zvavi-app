'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

import ConfirmDialog, { type ConfirmDialogTone } from './ConfirmDialog'
import { Button } from '../../primitives'

const noop = () => undefined

type DemoProps = {
  children: React.ReactNode
  confirmLabel: string
  icon?: typeof Trash2
  title: string
  tone: ConfirmDialogTone
}

const Demo = ({ children, confirmLabel, icon, title, tone }: DemoProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        {tone}
      </Button>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel={confirmLabel}
        icon={icon}
        isOpen={isOpen}
        onConfirm={noop}
        onOpenChange={setIsOpen}
        title={title}
        tone={tone}
      >
        {children}
      </ConfirmDialog>
    </>
  )
}

// An async action: Confirm spins until the promise settles, then the dialog closes
const AsyncDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleDelete = () => new Promise((resolve) => setTimeout(resolve, 1500))

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        danger, async
      </Button>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Delete"
        icon={Trash2}
        isOpen={isOpen}
        onConfirm={handleDelete}
        onOpenChange={setIsOpen}
        title="Delete forecast #180"
        tone="danger"
      >
        The forecast is deleted permanently. This can’t be undone.
      </ConfirmDialog>
    </>
  )
}

const ConfirmDialogGallery = () => (
  <div className="flex flex-wrap gap-2">
    <Demo confirmLabel="Delete" icon={Trash2} title="Delete forecast #180" tone="danger">
      The forecast and its avalanche problems are deleted permanently. Linked avalanches stay in the
      catalog, just unlinked. This can’t be undone.
    </Demo>
    <Demo confirmLabel="Discard" title="Discard changes" tone="warning">
      Your unsaved changes will be lost.
    </Demo>
    <Demo confirmLabel="Publish" title="Publish forecast #180" tone="info">
      It goes live on the website and in partner apps right away.
    </Demo>
    <AsyncDemo />
  </div>
)

export default ConfirmDialogGallery
