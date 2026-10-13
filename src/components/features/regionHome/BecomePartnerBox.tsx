import type { RegionId } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Shown while the region has no main partner: an invitation to become one
const BecomePartnerBox = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <div className="border-rule-strong bg-canvas flex flex-col items-center gap-2.5 rounded-[14px] border-2 border-dashed px-4 py-4.5 text-center">
      <b className="text-heading font-bold">{t('partners.main.placeholder.title')}</b>
      <p className="text-body text-copy-sm max-w-95 text-pretty">
        {t('regionHome.partners.pitch', { regionName: t(`regions.names.${regionId}`) })}
      </p>
      <Link
        className="focus-ring bg-primary hover:bg-primary-hover rounded-media text-copy mt-0.5 flex h-10 items-center gap-1 pr-3 pl-4 font-semibold text-white transition-colors"
        href={routes.about.contact}
      >
        {t('regionHome.partners.becomePartner')}
        <ChevronRight aria-hidden className="size-4.5" />
      </Link>
    </div>
  )
}

export default BecomePartnerBox
