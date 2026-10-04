'use client'

import { Pencil, Trash2, Unlink } from 'lucide-react'

import IconButton from './IconButton'

const IconButtonGallery = () => (
  <div className="flex items-center gap-3">
    <IconButton aria-label="Edit">
      <Pencil className="size-4.5" />
    </IconButton>
    <IconButton aria-label="Delete" size="md">
      <Trash2 className="size-4.5" />
    </IconButton>
    <IconButton aria-label="Remove from this forecast" tone="danger">
      <Unlink className="size-4.5" />
    </IconButton>
    <IconButton aria-label="Disabled" disabled>
      <Pencil className="size-4.5" />
    </IconButton>
  </div>
)

export default IconButtonGallery
