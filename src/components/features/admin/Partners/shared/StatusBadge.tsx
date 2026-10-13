import { StatusPill } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Active partners are shown on the public site; inactive ones are kept but hidden
const StatusBadge = ({ isActive }: { isActive: boolean }) => {
  const t = useTranslations()

  return (
    <StatusPill tone={isActive ? 'success' : 'neutral'}>
      {t(`admin.partners.statuses.${isActive ? 'active' : 'inactive'}`)}
    </StatusPill>
  )
}

export default StatusBadge
