'use client'

import { MemberView } from '@components/features/admin/Members/MemberView'
import { Spinner } from '@components/ui'
import { useMemberQuery } from '@data/hooks/members'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

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

const MemberViewPage = () => {
  const params = useParams()
  const memberId = params.id as string

  const { data: member, isPending } = useMemberQuery({ memberId })

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
      <MemberView member={member} />
    </div>
  )
}

export default MemberViewPage
