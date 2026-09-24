import { ImageIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

// Stands in for a photo whose resized copies aren't ready yet (generated a few
// seconds after submit) — instead of a broken image
const PhotoPlaceholder = ({ className }: { className?: string }) => {
  const t = useTranslations()

  return (
    <div
      aria-label={t('observations.photos.processing')}
      className={cn('bg-tile text-muted flex size-full items-center justify-center', className)}
      role="img"
    >
      <ImageIcon className="size-1/3 max-h-10 max-w-10" strokeWidth={1.5} />
    </div>
  )
}

export default PhotoPlaceholder
