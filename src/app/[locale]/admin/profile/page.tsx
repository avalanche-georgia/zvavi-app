'use client'

import { SecuritySection, UserProfileCard } from '@components/features/admin/UserProfiles'
import { AdminPageBody } from '@components/layout/admin'
import { LoadError } from '@components/shared'
import { Spinner } from '@components/ui'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'

const ProfilePage = () => {
  const { data: profile, isError, isPending, refetch } = useCurrentUserProfileQuery()

  if (isPending) return <Spinner size="lg" />

  // A failed load must not leave an empty page
  if (isError || !profile) return <LoadError onRetry={() => void refetch()} />

  return (
    <AdminPageBody className="max-w-3xl">
      <UserProfileCard profile={profile} />
      <SecuritySection email={profile.email} />
    </AdminPageBody>
  )
}

export default ProfilePage
