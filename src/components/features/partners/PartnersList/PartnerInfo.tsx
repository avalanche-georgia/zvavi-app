'use client'

import { useLocalizeField } from '@components/hooks'
import { ButtonLink } from '@components/shared'
import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

const PartnerInfo = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const localizeField = useLocalizeField()

  const benefit = localizeField(partner.benefitEn ?? '', partner.benefitKa)

  return (
    <div className="flex flex-col gap-4">
      {benefit && <p className="text-justify whitespace-pre-line">{benefit}</p>}
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
