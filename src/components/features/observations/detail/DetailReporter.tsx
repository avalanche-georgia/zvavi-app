import { Badge } from '@ds/primitives'
import { Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DetailSection from '../DetailSection'

type DetailReporterProps = {
  isTeam: boolean
  // Already shortened by the API; '' when unknown
  name: string
}

// Name only — contact and training are never public. A team record shows the
// staff member who logged it (when known) with a Team badge.
const DetailReporter = ({ isTeam, name }: DetailReporterProps) => {
  const t = useTranslations()

  if (!name && !isTeam) return null

  return (
    <DetailSection title={t('observations.detail.reportedBy')}>
      <div className="flex items-center gap-3">
        <div className="bg-primary-soft text-primary-ink grid size-10 place-items-center rounded-full font-bold">
          {name ? (
            Array.from(name)[0].toLocaleUpperCase()
          ) : (
            <Users aria-hidden className="size-5" />
          )}
        </div>
        {name && <b className="text-[15px]">{name}</b>}
        {isTeam && <Badge>{t('common.avalancheSources.team')}</Badge>}
      </div>
    </DetailSection>
  )
}

export default DetailReporter
