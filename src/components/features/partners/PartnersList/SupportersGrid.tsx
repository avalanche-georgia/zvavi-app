'use client'

import { useState } from 'react'
import type { Partner } from '@domain/types'

import PartnerSheet from './PartnerSheet'
import SupporterCard from './SupporterCard'
import SupporterTile from './SupporterTile'

// Tier 3: cards from `sm` up; on phones a 4-column grid of logo tiles that open a sheet
const SupportersGrid = ({ partners }: { partners: Partner[] }) => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handlePartnerSelect = (partner: Partner) => {
    setSelectedPartner(partner)
    setIsSheetOpen(true)
  }

  return (
    <>
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-3">
        {partners.map((partner) => (
          <li key={partner.id}>
            <div className="hidden h-full sm:block">
              <SupporterCard partner={partner} />
            </div>
            <div className="sm:hidden">
              <SupporterTile onSelect={handlePartnerSelect} partner={partner} />
            </div>
          </li>
        ))}
      </ul>
      <PartnerSheet isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} partner={selectedPartner} />
    </>
  )
}

export default SupportersGrid
