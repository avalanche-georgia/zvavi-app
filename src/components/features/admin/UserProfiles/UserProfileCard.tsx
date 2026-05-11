'use client'

import { useBoolean } from '@components/hooks'
import { Icon } from '@components/icons'
import { IconButton } from '@components/ui'
import type { UserProfile } from '@domain/types'
import { useTranslations } from 'next-intl'

import { AvatarUpload } from './UserProfileForm'
import { UserProfileForm } from './UserProfileForm'
import UserProfileView from './UserProfileView'

type UserProfileCardProps = {
  profile: UserProfile | null
}

const UserProfileCard = ({ profile }: UserProfileCardProps) => {
  const t = useTranslations()
  const [isEditing, { setFalse: stopEdit, setTrue: startEdit }] = useBoolean(false)

  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <h2 className="text-xl font-semibold">{t('admin.profile.title')}</h2>
        {!isEditing && <IconButton iconProps={{ icon: 'pencil' }} onClick={startEdit} />}
      </div>

      <div className="flex flex-col gap-6 p-4 md:flex-row md:p-6">
        <div className="flex shrink-0 flex-col items-center">
          {profile ? (
            <AvatarUpload profile={profile} />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full bg-gray-100">
              <Icon className="size-8 text-gray-400" icon="user" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <UserProfileForm onCancel={stopEdit} onSuccess={stopEdit} profile={profile} />
          ) : (
            <UserProfileView profile={profile} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfileCard
