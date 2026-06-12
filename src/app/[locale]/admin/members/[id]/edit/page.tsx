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
    <div className="mx-auto max-w-(--breakpoint-xl) p-4 md:p-6">
      <div className="rounded-lg bg-white p-6 text-center shadow-sm">
        <p className="text-gray-600">{t('admin.members.notFound')}</p>
      </div>
    </div>
  )
}

const EditMemberPage = () => {
  const router = useRouter()
  const params = useParams()

  const memberId = params.id as string

  const { data: member, isPending } = useMemberQuery({ memberId })

  const handleCancel = () => {
    router.push(routes.admin.members.view(memberId))
  }

  const handleSuccess = () => {
    router.push(routes.admin.members.view(memberId))
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
    <div className="mx-auto max-w-(--breakpoint-xl) p-4 md:p-6">
      <MemberForm
        initialFormData={getInitialFormData(member)}
        member={member}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    </div>
  )
}

export default EditMemberPage
