'use client'

import { PartnerBenefitsSheet } from '@components/features/join'
import { Loading } from '@components/shared'
import { useVerifyMember } from '@data/hooks/members'

import InvalidMember from './InvalidMember'
import MemberCard from './MemberCard'

type VerificationPageProps = {
  code: string
}

const VerificationPage = ({ code }: VerificationPageProps) => {
  const { data, isError, isPending } = useVerifyMember({ code })

  if (isPending) {
    return <Loading className="min-h-[50vh] py-0" isPage />
  }

  if (isError || !data?.success || !data.member) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <InvalidMember />
      </div>
    )
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-10 p-4">
      <MemberCard
        expiresAt={data.member.expiresAt}
        firstName={data.member.firstName}
        joinedAt={data.member.joinedAt}
        lastName={data.member.lastName}
        memberId={data.member.memberId}
        status={data.member.status}
      />

      <PartnerBenefitsSheet />
    </div>
  )
}

export default VerificationPage
