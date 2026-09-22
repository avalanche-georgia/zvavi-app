'use client'

import { useUserProfileQuery } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'

import InfoRow from './InfoRow'

type SubmitterInfoProps = {
  createdByUserId: string | null
  isExternal: boolean
  submitterContact: string | null
  submitterEducation: string | null
  submitterName: string | null
}

const SubmitterInfo = ({
  createdByUserId,
  isExternal,
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
  )
}

export default SubmitterInfo
