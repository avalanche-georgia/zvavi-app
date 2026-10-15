'use client'

import { Loading } from '@components/features/admin/shared'
import {
  PublicProfileSection,
  SecuritySection,
  UserProfileCard,
} from '@components/features/admin/UserProfiles'
import { AdminPageBody } from '@components/layout/admin'
import { LoadError } from '@components/shared'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'

const ProfilePage = () => {
  const { data: profile, isError, isPending, refetch } = useCurrentUserProfileQuery()

  if (isPending) return <Loading isPage />

  // A failed load must not leave an empty page
  if (isError || !profile) return <LoadError onRetry={() => void refetch()} />

  return (
    <AdminPageBody className="max-w-3xl">
      <UserProfileCard profile={profile} />
      <PublicProfileSection profile={profile} />
      <SecuritySection email={profile.email} />
    </AdminPageBody>
  )
}

export default ProfilePage
