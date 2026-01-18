'use client'

import { MembersList } from '@components/features/admin/Members/MembersList'
import { Spinner } from '@components/ui'
import { useMembersQuery } from '@data/hooks/members'
import { useTranslations } from 'next-intl'

const MembersPage = () => {
  const t = useTranslations()
  const { data: members, isPending } = useMembersQuery()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!members) return null

  return <MembersList members={members} />
}

export default MembersPage
