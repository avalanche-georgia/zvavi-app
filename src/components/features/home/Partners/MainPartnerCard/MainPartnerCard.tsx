'use client'

import { PartnerInfo, PartnerLogo } from '@components/features/partners/PartnersList'
import { useLocalizeField } from '@components/hooks'
import { Drawer } from '@components/ui'
import type { Partner } from '@domain/types'

const MainPartnerCard = ({ partner }: { partner: Partner }) => {
  const localizeField = useLocalizeField()
  const name = localizeField(partner.nameEn, partner.nameKa)

  return (
    <Drawer content={<PartnerInfo partner={partner} />} title={name}>
      <button
        className="bg-primary/10 flex h-36 w-64 flex-col items-center gap-3 rounded-2xl px-8 py-3"
        type="button"
      >
        <div className="inline-flex h-30 max-w-50 items-center justify-center">
          <PartnerLogo className="size-full" logoUrl={partner.logoUrl} name={name} />
        </div>
      </button>
    </Drawer>
  )
}

export default MainPartnerCard
