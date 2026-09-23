'use client'

import { useState } from 'react'
import { observationPhotoLimits } from '@domain/constants'
import { Camera, ImagePlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { maxSourceSizeMb } from './preparePhoto'

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

  const isEmpty = count === 0
  const { maxCount } = observationPhotoLimits

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
        'flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl text-center',
        'border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition-colors',
        'hover:border-primary/50 hover:bg-primary/5 hover:text-primary',
        'has-focus-visible:outline-primary/40 active:scale-[0.98] has-focus-visible:outline-2',
        isDragOver && 'border-primary bg-primary/10 text-primary',
        isEmpty ? 'col-span-full px-4 py-7 sm:py-9' : 'aspect-square',
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

      {isEmpty ? (
        <>
          <span className="bg-primary/10 text-primary mb-1 flex size-11 items-center justify-center rounded-full">
            <Camera className="size-5" />
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {t('observations.submit.photos.add')}
          </span>
          <span className="max-w-80 text-xs text-balance text-gray-500">
            {t('observations.submit.photos.hint', { max: maxCount, maxSize: maxSourceSizeMb })}
          </span>
        </>
      ) : (
        <>
          <ImagePlus className="size-6" />
          <span className="text-xs font-medium">{t('observations.submit.photos.addMore')}</span>
          <span className="text-[11px] text-gray-400 tabular-nums">
            {t('observations.submit.photos.count', { count, max: maxCount })}
          </span>
        </>
      )}
    </label>
  )
}

export default AddPhotoTile
