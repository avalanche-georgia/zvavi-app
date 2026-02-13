import { useMemo } from 'react'

import useMembersQuery from './useMembersQuery'

const usePendingMembersCount = () => {
  const { data: members } = useMembersQuery()

  return useMemo(() => members?.filter((m) => m.status === 'pending').length ?? 0, [members])
}

export default usePendingMembersCount
