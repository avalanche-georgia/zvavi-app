import { TeamBadge } from '@components/features/team'
import { ProfileSocialLinks } from '@components/shared'
import type { UserProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

// Read-only profile: name, role and team title, the "about" text and links
const UserProfileView = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations()
  const { about, fullName, role, socialLinks, team, teamTitle } = profile

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <p className="text-heading text-ink min-w-0 font-bold wrap-anywhere">{fullName || '—'}</p>
          {(team || teamTitle) && (
            <span className="sr-only">{`${t('admin.profile.form.labels.teamTitle')}:`}</span>
          )}
          <TeamBadge team={team} title={teamTitle} />
        </div>
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

      <ProfileSocialLinks urls={socialLinks} />
    </div>
  )
}

export default UserProfileView
