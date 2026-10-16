'use client'

import { useToast } from '@components/hooks'
import { useUserProfileUpdate } from '@data/hooks/userProfiles'
import type { UserProfile } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { Switch } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Opt-in to the public Team page; the section itself is set by an admin
const PublicProfileSection = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { isPending, mutate: updateProfile, variables } = useUserProfileUpdate()
  const { id, isPublic, team } = profile

  // Shows the new state right away; falls back to the saved one if it fails
  const isChecked = isPending ? (variables.isPublic ?? isPublic) : isPublic

  const handleCheckedChange = (checked: boolean) => {
    updateProfile(
      { id, isPublic: checked },
      { onError: (error) => toastError('PublicProfileSection | update', { error }) },
    )
  }

  return (
    <FormCard title={t('admin.profile.publicProfile.title')}>
      <div className="flex flex-col gap-2">
        <Switch
          checked={isChecked}
          label={t('admin.profile.publicProfile.label')}
          onCheckedChange={handleCheckedChange}
        />
        <p className="text-copy-sm text-muted">
          {team
            ? t('admin.profile.publicProfile.hint', {
                section: t(`team.sections.${team}.title`),
              })
            : t('admin.profile.publicProfile.noTeam')}
        </p>
      </div>
    </FormCard>
  )
}

export default PublicProfileSection
