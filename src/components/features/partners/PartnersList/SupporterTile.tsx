'use client'

import type { Partner } from '@domain/types'
import { Gift } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PartnerLogo from './PartnerLogo'
import usePartnerFields from './usePartnerFields'
import { usePartnerTracking } from '../tracking'

type SupporterTileProps = {
  onSelect: (partner: Partner) => void
  partner: Partner
}

// Tier 3 below `sm`: the logo alone; tapping it opens the partner's details
const SupporterTile = ({ onSelect, partner }: SupporterTileProps) => {
  const t = useTranslations()
  const { benefit, name } = usePartnerFields(partner)
  const { trackDetailsOpen } = usePartnerTracking(partner)

  const handleClick = () => {
    trackDetailsOpen()
    onSelect(partner)
  }

  return (
    <button
      aria-haspopup="dialog"
      aria-label={t('partners.page.aboutPartner', { name })}
      className="focus-ring rounded-media border-rule bg-surface relative block aspect-square w-full overflow-hidden border"
      onClick={handleClick}
      type="button"
    >
      <PartnerLogo className="rounded-none" logoUrl={partner.logoUrl} />
      {benefit && (
        <span
          aria-hidden
          className="bg-success-soft text-success absolute top-1 right-1 grid size-5 place-items-center rounded-full"
        >
          <Gift className="size-3" />
        </span>
      )}
    </button>
  )
}

export default SupporterTile
