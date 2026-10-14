import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { getMemberName } from '../../shared'

import { cn } from '@/lib/utils'

type MemberCellProps = {
  member: Member
  onOpen: (id: string) => void
}

// Name (opens the member) + email on a second line
const MemberCell = ({ member, onOpen }: MemberCellProps) => {
  const t = useTranslations()
  const { email, id } = member

  return (
    <div className="flex min-w-0 flex-col items-start gap-0.5">
      <button
        className="focus-ring text-ink hover:text-accent max-w-full truncate rounded-sm font-semibold hover:underline"
        onClick={() => onOpen(id)}
        type="button"
      >
        {getMemberName(member)}
      </button>
      <p className={cn('text-caption text-muted max-w-full truncate', !email && 'italic')}>
        {email || t('admin.members.view.noEmail')}
      </p>
    </div>
  )
}

export default MemberCell
