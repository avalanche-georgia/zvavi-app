'use client'

import { useLocalizeField } from '@components/hooks'
import { ButtonLink } from '@components/shared'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

const PartnerInfo = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const localizeField = useLocalizeField()

  const description = localizeField(partner.descriptionEn ?? '', partner.descriptionKa)
  const benefit = localizeField(partner.benefitEn ?? '', partner.benefitKa)

  return (
    <div className="flex flex-col gap-5">
      {description && (
        <div>
          <p className="mb-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
            {t('partners.drawer.descriptionLabel')}
          </p>
          <p className="text-sm whitespace-pre-line text-gray-700">{description}</p>
        </div>
      )}
      {benefit && (
        <div className="rounded-lg bg-blue-50 px-4 py-3">
          <p className="mb-1 text-xs font-semibold tracking-wide text-blue-600 uppercase">
            {t('partners.drawer.benefitLabel')}
          </p>
          <p className="text-sm whitespace-pre-line text-blue-900">{benefit}</p>
        </div>
      )}
      <ButtonLink
        className="ml-auto"
        href={partner.websiteUrl}
        isExternal
        rel="noreferrer"
        target="_blank"
      >
        {t('common.actions.visitWebsite')}
      </ButtonLink>
    </div>
  )
}

export default PartnerInfo
