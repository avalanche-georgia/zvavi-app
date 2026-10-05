'use client'

import { useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'

import ConfirmPopover from './ConfirmPopover'
import { Button } from '../Button'
import { IconButton } from '../IconButton'

const noop = () => undefined

// Controlled: something else asks (e.g. a menu item), the popover anchors to another element
const AnchoredDemo = () => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleAsk = () => setIsOpen(true)

  return (
    <>
      <Button ref={anchorRef} onClick={handleAsk} size="sm" variant="secondary">
        Ask from elsewhere
      </Button>
      <ConfirmPopover
        anchor={anchorRef}
        cancelLabel="Cancel"
        confirmLabel="Delete"
        isOpen={isOpen}
        message="Delete forecast #180?"
        onConfirm={noop}
        onOpenChange={setIsOpen}
      />
    </>
  )
}

const ConfirmPopoverGallery = () => (
  <div className="bg-canvas rounded-media flex flex-wrap items-center gap-3 p-3">
    <ConfirmPopover
      cancelLabel="Cancel"
      confirmLabel="Remove"
      message='Remove "Storm Slab" from this forecast?'
      onConfirm={noop}
    >
      <IconButton aria-label="Remove" tone="danger">
        <Trash2 className="size-4" />
      </IconButton>
    </ConfirmPopover>
    <AnchoredDemo />
  </div>
)

export default ConfirmPopoverGallery
