'use client'

import { Spinner } from '@components/ui'
import { useVerifyMember } from '@data/hooks/members'
import { useTranslations } from 'next-intl'

import InvalidMember from './InvalidMember'
import MemberCard from './MemberCard'

type VerificationPageProps = {
  code: string
}

const VerificationPage = ({ code }: VerificationPageProps) => {
  const t = useTranslations()
  const { data, isError, isPending } = useVerifyMember({ code })

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner label={t('common.labels.wait')} size="lg" />
      </div>
    )
  }

  if (isError || !data?.success || !data.member) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <InvalidMember />
      </div>
    )
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <MemberCard
        expiresAt={data.member.expiresAt}
        firstName={data.member.firstName}
        joinedAt={data.member.joinedAt}
        lastName={data.member.lastName}
        memberId={data.member.memberId}
        status={data.member.status}
      />
    </div>
  )
}

export default VerificationPage
