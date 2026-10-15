import { Loading } from '@components/shared'
import type { Member } from '@domain/types'
import { useTranslations } from 'next-intl'

import { ApproveForm } from './ApproveForm'
import { MemberView } from './MemberView'
import type { MemberSheetMode } from './types'
import { MemberForm } from '../MemberForm'

type MemberSheetBodyProps = {
  formId: string
  // The list is still loading, so the member may yet turn up
  isLoading: boolean
  member: Member | null
  mode: MemberSheetMode
  onDirtyChange: (isDirty: boolean) => void
  onSaved: VoidFunction
  onSubmittingChange: (isSubmitting: boolean) => void
}

const MemberSheetBody = ({
  formId,
  isLoading,
  member,
  mode,
  onDirtyChange,
  onSaved,
  onSubmittingChange,
}: MemberSheetBodyProps) => {
  const t = useTranslations()

  if (!member && isLoading) {
    return <Loading className="h-60 py-0" />
  }

  if (!member) {
    return (
      <p className="text-copy text-muted px-4 py-12 text-center">{t('admin.members.notFound')}</p>
    )
  }

  if (mode === 'view') return <MemberView member={member} />

  const Form = mode === 'approve' ? ApproveForm : MemberForm

  return (
    <Form
      formId={formId}
      member={member}
      onDirtyChange={onDirtyChange}
      onSubmittingChange={onSubmittingChange}
      onSuccess={onSaved}
    />
  )
}

export default MemberSheetBody
