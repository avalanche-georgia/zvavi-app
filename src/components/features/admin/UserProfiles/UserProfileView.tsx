import type { UserProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

// Read-only profile: name, role and the "about" text
const UserProfileView = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations()
  const { about, fullName, role } = profile

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-heading text-ink font-bold">{fullName || '—'}</p>
        <p className="text-copy-sm text-muted capitalize">{role ?? '—'}</p>
      </div>

      {about && (
        <div className="flex flex-col gap-1">
          <p className="text-caption text-muted font-semibold tracking-wider uppercase">
            {t('admin.profile.form.labels.about')}
          </p>
          <p className="text-copy text-body whitespace-pre-wrap">{about}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfileView
