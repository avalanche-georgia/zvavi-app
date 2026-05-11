'use client'

import { SecuritySection, UserProfileCard } from '@components/features/admin/UserProfiles'
import { Spinner } from '@components/ui'
import { useCurrentUserProfileQuery } from '@data/hooks/userProfiles'

const ProfilePage = () => {
  const { data: profile, isPending } = useCurrentUserProfileQuery()

  if (isPending) return <Spinner />

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-4 md:p-6">
      <UserProfileCard profile={profile ?? null} />
      <SecuritySection email={profile?.email ?? ''} />
    </div>
  )
}

export default ProfilePage
