import type { Member } from '@domain/types'
import { Button } from '@ds/primitives'
import { Pencil, Trash2, UserRoundCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

type ViewActionsProps = {
  member: Member
  onApprove: VoidFunction
  onDelete: VoidFunction
  onEdit: VoidFunction
}

// Approve (pending applications) + edit + delete
const ViewActions = ({ member, onApprove, onDelete, onEdit }: ViewActionsProps) => {
  const t = useTranslations()

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {member.status === 'pending' && (
        <Button onClick={onApprove}>
          <UserRoundCheck aria-hidden className="size-4" />
          {t('admin.members.actions.approve')}
        </Button>
      )}
      <Button onClick={onEdit} variant="secondary">
        <Pencil aria-hidden className="size-4" />
        {t('common.actions.edit')}
      </Button>
      <Button className="ml-auto" onClick={onDelete} variant="secondary">
        <Trash2 aria-hidden className="size-4" />
        {t('common.actions.delete')}
      </Button>
    </div>
  )
}

export default ViewActions
