'use client'

import { ListLoadError } from '@components/features/admin/shared'
import { TeamBoard } from '@components/features/admin/Team'
import { AdminPageBody } from '@components/layout/admin'
import { useTeamProfilesQuery } from '@data/hooks/userProfiles'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const TeamContainer = () => {
  const t = useTranslations()
  const profilesQuery = useTeamProfilesQuery()

  // A failed background refetch keeps the data on screen; the error block is for first loads
  const isLoadFailed = profilesQuery.isError && !profilesQuery.data

  const handleRetry = () => void profilesQuery.refetch()

  return (
    <AdminPageBody className="max-w-3xl">
      <p className="text-copy-sm text-muted">
        {t.rich('admin.team.hint', {
          link: (chunks) => (
            <Link className="text-accent hover:underline" href={routes.about.team} target="_blank">
              {chunks}
            </Link>
          ),
        })}
      </p>
      {isLoadFailed ? (
        <ListLoadError onRetry={handleRetry} />
      ) : (
        <TeamBoard isLoading={profilesQuery.isPending} profiles={profilesQuery.data} />
      )}
    </AdminPageBody>
  )
}

export default TeamContainer
