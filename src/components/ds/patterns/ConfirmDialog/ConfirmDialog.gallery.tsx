'use client'

import { useState } from 'react'

import ConfirmDialog from './ConfirmDialog'
import { Button } from '../../primitives'

const noop = () => undefined

const ConfirmDialogGallery = () => {
  const [isPublishOpen, setIsPublishOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handlePublishOpen = () => setIsPublishOpen(true)
  const handleDeleteOpen = () => setIsDeleteOpen(true)

  // Busy for a moment, then done: the caller closes the dialog
  const handleDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setIsDeleteOpen(false)
    }, 1500)
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handlePublishOpen} variant="secondary">
        Publish…
      </Button>
      <Button onClick={handleDeleteOpen} variant="secondary">
        Delete…
      </Button>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Publish"
        isOpen={isPublishOpen}
        onConfirm={noop}
        onOpenChange={setIsPublishOpen}
        title="Publish forecast #180?"
      >
        It goes live on the website and in partner apps right away.
      </ConfirmDialog>
      <ConfirmDialog
        cancelLabel="Cancel"
        confirmLabel="Delete"
        isBusy={isDeleting}
        isOpen={isDeleteOpen}
        onConfirm={handleDelete}
        onOpenChange={setIsDeleteOpen}
        title="Delete this record permanently?"
        tone="danger"
      />
    </div>
  )
}

export default ConfirmDialogGallery
