'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type AddPhotoTileProps = {
  count: number
  onFilesSelect: (files: File[]) => void
}

// A <label> around the input so the whole tile opens the native picker — on
// phones `accept="image/*"` offers both the camera and the photo library.
// Also a drop target for desktop drag-and-drop.
const AddPhotoTile = ({ count, onFilesSelect }: AddPhotoTileProps) => {
  const t = useTranslations()
  const [isDragOver, setIsDragOver] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilesSelect(Array.from(event.target.files ?? []))
    // Reset so picking the same file again (e.g. after removing it) still fires
    event.target.value = ''
  }

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    onFilesSelect(Array.from(event.dataTransfer.files))
  }

  return (
    <label
      className={cn(
        'rounded-media flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 text-center',
        'border-off bg-canvas text-copy-sm text-body border-[1.5px] border-dashed font-semibold transition-colors',
        'hover:border-primary hover:text-primary has-focus-visible:outline-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2',
        isDragOver && 'border-primary bg-primary-soft text-primary',
      )}
      onDragLeave={() => setIsDragOver(false)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        accept="image/*"
        className="sr-only"
        multiple
        onChange={handleInputChange}
        type="file"
      />
      <Camera aria-hidden className="size-5.5" />
      {t(count === 0 ? 'observations.submit.photos.add' : 'observations.submit.photos.addMore')}
    </label>
  )
}

export default AddPhotoTile
