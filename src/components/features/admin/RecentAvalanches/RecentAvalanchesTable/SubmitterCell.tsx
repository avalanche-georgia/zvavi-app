import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useUserProfileQuery } from '@data/hooks/userProfiles'

// Public reports carry the reporter's name; team records show who logged them
// (profiles are cached per user, so a page costs one request per team member)
const SubmitterCell = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const { createdByUserId, submitterName } = avalanche
  const { data: creatorProfile } = useUserProfileQuery({
    enabled: !submitterName && !!createdByUserId,
    id: createdByUserId ?? '',
  })

  return (
    <span className="block truncate text-sm text-gray-600">
      {submitterName || creatorProfile?.fullName || '—'}
    </span>
  )
}

export default SubmitterCell
