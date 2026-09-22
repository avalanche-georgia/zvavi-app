'use client'

import { useUserProfileQuery } from '@data/hooks/userProfiles'
import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'

import InfoRow from './InfoRow'
import SourceBadge from '../RecentAvalanchesTable/SourceBadge'

type SubmitterInfoProps = {
  createdByUserId: string | null
  isExternal: boolean
  source: AvalancheSource
  submitterContact: string | null
  submitterEducation: string | null
  submitterName: string | null
}

const SubmitterInfo = ({
  createdByUserId,
  isExternal,
  source,
  submitterContact,
  submitterEducation,
  submitterName,
}: SubmitterInfoProps) => {
  const t = useTranslations()

  const { data: creatorProfile } = useUserProfileQuery({
    enabled: !submitterName && !!createdByUserId,
    id: createdByUserId ?? '',
  })

  const fullName = submitterName || creatorProfile?.fullName || '—'

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-700">
          {t('admin.recentAvalanches.form.labels.submitterSection')}
        </span>
        <SourceBadge source={source} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoRow label={t('admin.recentAvalanches.form.labels.submitterName')} value={fullName} />

        {isExternal && (
          <>
            <InfoRow
              label={t('admin.recentAvalanches.form.labels.submitterEducation')}
              value={submitterEducation || '—'}
            />
            <div className="col-span-2">
              <InfoRow
                label={t('admin.recentAvalanches.form.labels.submitterContact')}
                value={submitterContact || '—'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SubmitterInfo
