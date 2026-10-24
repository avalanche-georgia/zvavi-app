'use client'

import { useLocalizeField } from '@components/hooks'
import { Icon } from '@components/icons'
import type { Partner } from '@domain/types'
import { getButtonClasses } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import { usePartnerTracking } from '../tracking'

const PartnerInfo = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const localizeField = useLocalizeField()
  const { trackDrawerWebsiteClick } = usePartnerTracking(partner)

  const description = localizeField(partner.descriptionEn ?? '', partner.descriptionKa)
  const benefit = localizeField(partner.benefitEn ?? '', partner.benefitKa)

  return (
    <div className="flex flex-col gap-5">
      {description && (
        <div>
          <p className="text-muted text-caption tracking-eyebrow mb-1 font-semibold uppercase">
            {t('partners.drawer.descriptionLabel')}
          </p>
          <p className="text-body text-copy whitespace-pre-line">{description}</p>
        </div>
      )}
      {benefit && (
        <div className="rounded-media bg-accent-soft px-4 py-3">
          <p className="text-accent text-caption tracking-eyebrow mb-1 font-semibold uppercase">
            {t('partners.drawer.benefitLabel')}
          </p>
          <p className="text-ink text-copy whitespace-pre-line">{benefit}</p>
        </div>
      )}
      <a
        className={getButtonClasses({ className: 'ml-auto', size: 'sm' })}
        href={partner.websiteUrl}
        onClick={trackDrawerWebsiteClick}
        rel="noreferrer"
        target="_blank"
      >
        {t('common.actions.visitWebsite')}
        <Icon icon="externalLink" size="sm" />
      </a>
    </div>
  )
}

export default PartnerInfo
