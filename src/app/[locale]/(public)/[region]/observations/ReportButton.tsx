import type { RegionId } from '@domain/types'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const ReportButton = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <Link
      // Explicit radius, not rounded-full: its infinite radius makes Safari draw
      // the shadow clipped to a box
      className="focus-ring bg-primary hover:bg-primary-hover text-copy-lg shadow-fab fixed right-4 bottom-[calc(18px+env(safe-area-inset-bottom))] z-30 flex h-13.5 items-center gap-2 rounded-[27px] pr-5 pl-4 font-semibold text-white transition-colors lg:right-6 lg:bottom-6"
      href={routes.observationsByRegion(regionId).submit}
    >
      <Plus className="size-5" />
      {t('observations.reportCta')}
    </Link>
  )
}

export default ReportButton
