import { Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

// Off-season: above the regions on the chooser, above the danger card on a region home
const OffSeasonNote = ({ className }: { className?: string }) => {
  const t = useTranslations()

  return (
    <div
      className={cn(
        'bg-accent-soft text-accent-hover rounded-media text-copy-sm flex items-start gap-3 px-4 py-3',
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-4.5 shrink-0" />
      <p>
        <b className="font-semibold">{t('home.hero.offSeason.title')}</b>{' '}
        {t('home.hero.offSeason.message')}
      </p>
    </div>
  )
}

export default OffSeasonNote
