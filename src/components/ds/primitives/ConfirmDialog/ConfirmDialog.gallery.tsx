'use client'

import { useState } from 'react'

import ConfirmDialog from './ConfirmDialog'
import { Button } from '../Button'

const noop = () => undefined

const ConfirmDialogGallery = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <div className="bg-canvas rounded-media flex flex-wrap items-center gap-3 p-3">
      <Button onClick={handleOpen} size="sm" variant="primary">
        Publish…
      </Button>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Publish forecast"
        isOpen={isOpen}
        onConfirm={noop}
        onOpenChange={setIsOpen}
        title="Publish forecast #180?"
      >
        <p>Gudauri · overall Considerable (3)</p>
        <p>It becomes visible on the site and to partner apps immediately.</p>
      </ConfirmDialog>
    </div>
  )
}

export default ConfirmDialogGallery
