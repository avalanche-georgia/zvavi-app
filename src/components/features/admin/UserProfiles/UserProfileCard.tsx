'use client'

import { useBoolean } from '@components/hooks'
import type { UserProfile } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AvatarUpload, UserProfileForm } from './UserProfileForm'
import UserProfileView from './UserProfileView'

// Photo, name and "about" — read first, edited in place
const UserProfileCard = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations()
  const [isEditing, { setFalse: stopEdit, setTrue: startEdit }] = useBoolean(false)

  const editButton = !isEditing && (
    <Button onClick={startEdit} size="sm" variant="secondary">
      <Pencil aria-hidden className="size-4" />
      {t('common.actions.edit')}
    </Button>
  )

  return (
    <FormCard actions={editButton} className="@container" title={t('admin.profile.details')}>
      <div className="flex flex-col gap-6 @xl:flex-row">
        <AvatarUpload profile={profile} />
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <UserProfileForm onCancel={stopEdit} onSuccess={stopEdit} profile={profile} />
          ) : (
            <UserProfileView profile={profile} />
          )}
        </div>
      </div>
    </FormCard>
  )
}

export default UserProfileCard
