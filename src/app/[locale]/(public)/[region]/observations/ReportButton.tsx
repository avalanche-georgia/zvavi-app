import { ButtonLink } from '@components/shared'
import type { RegionId } from '@domain/types'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const ReportButton = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <ButtonLink
      // Explicit radius, not rounded-full: its infinite radius makes Safari draw
      // the shadow clipped to a box
      className="bg-primary hover:bg-primary-hover fixed right-4 bottom-[calc(18px+env(safe-area-inset-bottom))] z-30 h-13.5 max-w-none gap-2 rounded-[27px] pr-5 pl-4 text-[15px] font-semibold shadow-[0_6px_18px_-4px_rgba(255,111,0,.5)] lg:right-6 lg:bottom-6"
      href={routes.observationsByRegion(regionId).submit}
    >
      <Plus className="size-5" />
      {t('observations.reportCta')}
    </ButtonLink>
  )
}

export default ReportButton
