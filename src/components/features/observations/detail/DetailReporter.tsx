import { TeamMemberPhoto } from '@components/features/team'
import { Badge } from '@ds/primitives'
import { Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DetailSection from '../DetailSection'

type DetailReporterProps = {
  avatarUrl: string | null
  isTeam: boolean
  // Already shortened by the API; '' when unknown
  name: string
}

// Name only — contact and training are never public. A team record shows the
// staff member who logged it (when known) with their photo and a Team badge.
const DetailReporter = ({ avatarUrl, isTeam, name }: DetailReporterProps) => {
  const t = useTranslations()

  if (!name && !isTeam) return null

  return (
    <DetailSection title={t('observations.detail.reportedBy')}>
      <div className="flex items-center gap-3">
        {name ? (
          <TeamMemberPhoto
            avatarUrl={avatarUrl}
            className="size-10 rounded-full"
            initialsClassName="text-copy"
            name={name}
            width={40}
          />
        ) : (
          <span className="bg-primary-soft text-primary-ink grid size-10 place-items-center rounded-full">
            <Users aria-hidden className="size-5" />
          </span>
        )}
        {name && <b className="text-copy-lg">{name}</b>}
        {isTeam && <Badge>{t('common.avalancheSources.team')}</Badge>}
      </div>
    </DetailSection>
  )
}

export default DetailReporter
