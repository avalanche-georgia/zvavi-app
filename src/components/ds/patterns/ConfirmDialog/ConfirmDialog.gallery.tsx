'use client'

import { useState } from 'react'

import ConfirmDialog from './ConfirmDialog'
import { Button } from '../../primitives'

const noop = () => undefined

const ConfirmDialogGallery = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        Publish…
      </Button>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Publish"
        isOpen={isOpen}
        onConfirm={noop}
        onOpenChange={setIsOpen}
        title="Publish forecast #180?"
      >
        It goes live on the website and in partner apps right away.
      </ConfirmDialog>
    </>
  )
}

export default ConfirmDialogGallery
