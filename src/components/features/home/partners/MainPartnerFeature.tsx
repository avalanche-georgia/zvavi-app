'use client'

import { PartnerLogo } from '@components/features/partners/PartnersList'
import { usePartnerTracking } from '@components/features/partners/tracking'
import { useLocalizeField } from '@components/hooks'
import type { Partner } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type MainPartnerFeatureProps = {
  // Two side by side: logo above the text
  isStacked: boolean
  partner: Partner
}

// Logo, "Main partner", name, a line about them — the whole card opens their website
const MainPartnerFeature = ({ isStacked, partner }: MainPartnerFeatureProps) => {
  const t = useTranslations()
  const localizeField = useLocalizeField()
  const { trackWebsiteClick } = usePartnerTracking(partner)
  const name = localizeField(partner.nameEn, partner.nameKa)
  const description = partner.descriptionEn
    ? localizeField(partner.descriptionEn, partner.descriptionKa)
    : null

  return (
    <a
      className={cn(
        'focus-ring rounded-card border-rule bg-surface text-ink hover:border-rule-strong grid h-full items-center gap-4 border p-5 transition-colors md:p-6',
        !isStacked && 'md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-7',
      )}
      href={partner.websiteUrl}
      onClick={trackWebsiteClick}
      rel="noopener noreferrer sponsored"
      target="_blank"
    >
      <span className={cn('block aspect-5/2 w-full', isStacked ? 'max-w-60' : 'max-w-70')}>
        <PartnerLogo logoUrl={partner.logoUrl} name={name} />
      </span>
      <span className="min-w-0">
        <span className="text-primary-ink tracking-eyebrow block text-xs font-semibold uppercase">
          {t('home.partners.badge')}
        </span>
        <b className="text-title-sm mt-1 mb-1.5 block font-bold wrap-anywhere">{name}</b>
        {description && (
          <span className="text-body text-copy line-clamp-3 block max-w-[52ch]">{description}</span>
        )}
        <span className="text-accent text-copy mt-2.5 inline-flex items-center gap-0.5 font-semibold">
          {t('home.partners.visitWebsite')}
          <ChevronRight aria-hidden className="size-4" />
        </span>
      </span>
    </a>
  )
}

export default MainPartnerFeature
