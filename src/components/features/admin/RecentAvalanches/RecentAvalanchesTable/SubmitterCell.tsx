import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useStaffNameQuery } from '@data/hooks/userProfiles'

// Public reports carry the reporter's name; team records show who logged them
// (names are cached per user, so a page costs one request per team member)
const SubmitterCell = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const { createdByUserId, submitterName } = avalanche
  const { data: creatorName } = useStaffNameQuery({
    enabled: !submitterName && !!createdByUserId,
    id: createdByUserId ?? '',
  })

  return (
    <span className="block truncate text-sm text-gray-600">
      {submitterName || creatorName || '—'}
    </span>
  )
}

export default SubmitterCell
