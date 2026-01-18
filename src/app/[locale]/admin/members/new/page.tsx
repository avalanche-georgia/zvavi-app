'use client'

import { getInitialFormData, MemberForm } from '@components/features/admin/Members/MemberForm'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NewMemberPage = () => {
  const router = useRouter()

  const handleCancel = () => {
    router.push(routes.admin.members.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.members.root)
  }

  return (
    <MemberForm
      initialFormData={getInitialFormData(null)}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default NewMemberPage
