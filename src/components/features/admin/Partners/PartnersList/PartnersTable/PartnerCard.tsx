import type { Partner } from '@domain/types'
import { useTranslations } from 'next-intl'

import { usePartnersTable } from './PartnersTableContext'
import { StatusBadge } from '../../shared'
import PartnerCell from '../PartnerCell'
import RowActions from '../RowActions'

// ≤640px: logo + name | status | ⋯, with the tier underneath
const PartnerCard = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()
  const { onPartnerOpen } = usePartnersTable()
  const { isActive, tier } = partner

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-1.5">
      <PartnerCell onOpen={onPartnerOpen} partner={partner} />
      <StatusBadge isActive={isActive} />
      <RowActions onOpen={onPartnerOpen} partner={partner} />
      <p className="text-caption text-muted col-span-3">
        {t('admin.partners.list.tierLine', { level: t(`partners.levels.${tier}`), tier })}
      </p>
    </div>
  )
}

export default PartnerCard
