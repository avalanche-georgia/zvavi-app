'use client'

import { Check, RotateCw } from 'lucide-react'
import { useTranslations } from 'next-intl'

import UploadProgressRing from './UploadProgressRing'
import type { PhotoUpload } from '../schema'

type PhotoTileStatusProps = {
  onRetry: () => void
  photo: PhotoUpload
}

const PhotoTileStatus = ({ onRetry, photo }: PhotoTileStatusProps) => {
  const t = useTranslations()

  const { progress, status } = photo

  if (status === 'uploaded') {
    return (
      <span className="animate-copy-pop pointer-events-none absolute bottom-1.5 left-1.5 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
        <Check className="size-3" strokeWidth={3} />
      </span>
    )
  }

  if (status === 'failed') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 px-2 pt-6 text-center text-white">
        <span className="text-xs leading-tight font-medium">
          {t('observations.submit.photos.failed')}
        </span>
        <button
          className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 active:scale-95"
          onClick={onRetry}
          type="button"
        >
          <RotateCw className="size-3.5" />
          {t('observations.submit.photos.retry')}
        </button>
      </div>
    )
  }

  const isUploading = status === 'uploading'

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/45 text-white">
      <UploadProgressRing progress={isUploading ? progress : null} />
      <span className="text-[11px] font-medium tabular-nums">
        {isUploading ? `${Math.round(progress * 100)}%` : t('observations.submit.photos.preparing')}
      </span>
    </div>
  )
}

export default PhotoTileStatus
