import type { Member } from '@domain/types'

import { useMembersTable } from './MembersTableContext'
import { StatusBadge } from '../../shared'
import { ExpiresCell, MemberCell } from '../cells'
import RowActions from '../RowActions'

// ≤640px: member + status | "Expires …" + ⋯
const MemberCard = ({ member }: { member: Member }) => {
  const { onMemberOpen } = useMembersTable()

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
      <MemberCell member={member} onOpen={onMemberOpen} />
      <StatusBadge status={member.status} />
      <ExpiresCell expiresAt={member.expiresAt} isInline />
      <RowActions isCompact member={member} onOpen={onMemberOpen} />
    </div>
  )
}

export default MemberCard
