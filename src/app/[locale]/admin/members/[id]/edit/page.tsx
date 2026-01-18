'use client'

import { getInitialFormData, MemberForm } from '@components/features/admin/Members/MemberForm'
import { Spinner } from '@components/ui'
import { useMemberQuery } from '@data/hooks/members'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className="rounded-lg bg-white p-6 text-center shadow">
      <p className="text-gray-600">{t('admin.members.notFound')}</p>
    </div>
  )
}

const EditMemberPage = () => {
  const router = useRouter()
  const params = useParams()

  const memberId = params.id as string

  const { data: member, isPending } = useMemberQuery({ memberId })

  const handleCancel = () => {
    router.push(routes.admin.members.root)
  }

  const handleSuccess = () => {
    router.push(routes.admin.members.root)
  }

  if (!memberId) {
    return <NotFound />
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (!member) {
    return <NotFound />
  }

  return (
    <MemberForm
      initialFormData={getInitialFormData(member)}
      member={member}
      onCancel={handleCancel}
      onSuccess={handleSuccess}
    />
  )
}

export default EditMemberPage
