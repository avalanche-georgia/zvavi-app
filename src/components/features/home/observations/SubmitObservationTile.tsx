import type { RegionId } from '@domain/types'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Dashed invitation next to the latest observations: report one
const SubmitObservationTile = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <Link
      className="focus-ring rounded-media border-rule-strong hover:border-primary hover:bg-surface text-ink flex flex-col items-center justify-center gap-2.5 border-2 border-dashed p-5 text-center transition-colors"
      href={routes.observationsByRegion(regionId).submit}
    >
      <span
        aria-hidden
        className="bg-primary grid size-11 place-items-center rounded-full text-white"
      >
        <Plus className="size-5" />
      </span>
      <b className="text-copy-lg font-semibold">{t('home.observations.cta.title')}</b>
      <span className="text-copy-sm text-body max-w-50">{t('home.observations.cta.message')}</span>
    </Link>
  )
}

export default SubmitObservationTile
