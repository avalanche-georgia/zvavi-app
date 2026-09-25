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
      <span className="animate-copy-pop bg-success pointer-events-none absolute bottom-1.5 left-1.5 flex size-5 items-center justify-center rounded-full text-white">
        <Check className="size-3" strokeWidth={3} />
      </span>
    )
  }

  if (status === 'failed') {
    return (
      <div className="bg-ink/72 text-caption absolute inset-0 flex flex-col items-center justify-center gap-2 px-2 pt-6 text-center text-white">
        <span className="leading-tight font-medium">{t('observations.submit.photos.failed')}</span>
        <button
          className="focus-ring bg-surface text-ink flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold active:scale-95"
          onClick={onRetry}
          type="button"
        >
          <RotateCw className="size-3.5" />
          {t('observations.submit.photos.retry')}
        </button>
      </div>
    )
  }

  // Compressing the photo — no byte progress to report yet
  if (status === 'preparing') {
    return (
      <div className="bg-ink/45 text-caption pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
        <UploadProgressRing />
        <span className="font-medium">{t('observations.submit.photos.preparing')}</span>
      </div>
    )
  }

  return (
    <div
      aria-label={t('observations.submit.photos.uploading')}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(progress * 100)}
      className="pointer-events-none absolute inset-x-2 bottom-2 h-1 overflow-hidden rounded-full bg-white/50"
      role="progressbar"
    >
      <span
        className="block h-full bg-white transition-[width] duration-200 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export default PhotoTileStatus
