'use client'

import type { UserProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

const UserProfileView = ({ profile }: { profile: UserProfile | null }) => {
  const t = useTranslations()
  const { about, fullName, role } = profile || {}

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-semibold">{fullName || '—'}</p>
        <p className="text-sm text-gray-500 capitalize">{role ?? '—'}</p>
      </div>

      {about && (
        <div>
          <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
            {t('admin.profile.form.labels.about')}
          </p>
          <p className="mt-0.5 text-sm whitespace-pre-wrap">{about}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfileView
