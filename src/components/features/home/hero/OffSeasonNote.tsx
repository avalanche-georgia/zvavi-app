import { Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Above the regions while no region is forecasting
const OffSeasonNote = () => {
  const t = useTranslations()

  return (
    <div className="bg-accent-soft text-accent-hover rounded-media text-copy-sm mb-3 flex items-start gap-3 px-4 py-3">
      <Info aria-hidden className="mt-0.5 size-4.5 shrink-0" />
      <p>
        <b className="font-semibold">{t('home.hero.offSeason.title')}</b>{' '}
        {t('home.hero.offSeason.message')}
      </p>
    </div>
  )
}

export default OffSeasonNote
