'use client'

import { useState } from 'react'
import {
  getInitialFormData,
  MemberCreatedDialog,
  MemberForm,
} from '@components/features/admin/Members/MemberForm'
import type { Member } from '@domain/types'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewMemberPage = () => {
  const router = useRouter()
  const [createdMember, setCreatedMember] = useState<Member | null>(null)

  const handleCancel = () => {
    router.push(routes.admin.members.root)
  }

  const handleSuccess = (member?: Member) => {
    if (member) {
      setCreatedMember(member)
    } else {
      router.push(routes.admin.members.root)
    }
  }

  const handleDialogClose = () => {
    setCreatedMember(null)
    router.push(routes.admin.members.root)
  }

  return (
    <>
      <MemberForm
        initialFormData={getInitialFormData(null)}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
      <MemberCreatedDialog
        isOpen={!!createdMember}
        member={createdMember}
        onClose={handleDialogClose}
      />
    </>
  )
}

export default NewMemberPage
