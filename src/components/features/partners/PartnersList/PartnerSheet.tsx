'use client'

import { useLocalizeField } from '@components/hooks'
import type { Partner } from '@domain/types'
import { Sheet, SheetHeader } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import CardLogo from './CardLogo'
import PartnerLink from './PartnerLink'
import PerkCallout from './PerkCallout'
import usePartnerFields from './usePartnerFields'
import { usePartnerTracking } from '../tracking'

const PartnerSheetBody = ({ partner }: { partner: Partner }) => {
  const { benefit, description, name } = usePartnerFields(partner)
  const { trackDrawerWebsiteClick } = usePartnerTracking(partner)

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 pb-[calc(24px+env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-3.5">
        <CardLogo className="rounded-media size-16" logoUrl={partner.logoUrl} />
        <PartnerLink name={name} onClick={trackDrawerWebsiteClick} url={partner.websiteUrl} />
      </div>
      {description && (
        <p className="text-copy text-body text-pretty whitespace-pre-line">{description}</p>
      )}
      {benefit && <PerkCallout benefit={benefit} />}
    </div>
  )
}

type PartnerSheetProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  // Kept while closing, so the content doesn't vanish mid-animation
  partner: Partner | null
}

// A supporter's full details, opened from its logo tile on phones
const PartnerSheet = ({ isOpen, onOpenChange, partner }: PartnerSheetProps) => {
  const t = useTranslations()
  const localizeField = useLocalizeField()

  if (!partner) return null

  return (
    <Sheet
      header={
        <SheetHeader
          closeLabel={t('common.actions.close')}
          title={localizeField(partner.nameEn, partner.nameKa)}
        />
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollKey={partner.id}
    >
      <PartnerSheetBody partner={partner} />
    </Sheet>
  )
}

export default PartnerSheet
