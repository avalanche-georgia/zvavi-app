import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import { usePartnersTable } from './PartnersTableContext'
import { ActiveSwitch } from '../../shared'
import PartnerCell from '../PartnerCell'
import RowActions from '../RowActions'

// ≤640px: logo + name | active switch | ⋯, with the tier underneath
const PartnerCard = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { onPartnerOpen } = usePartnersTable()
  const { tier } = partner

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-1.5">
      <PartnerCell onOpen={onPartnerOpen} partner={partner} />
      <ActiveSwitch partner={partner} />
      <RowActions onOpen={onPartnerOpen} partner={partner} />
      <p className="text-caption text-muted col-span-3">
        {t('admin.partners.list.tierLine', { level: t(`partners.levels.${tier}`), tier })}
      </p>
    </div>
  )
}

export default PartnerCard
