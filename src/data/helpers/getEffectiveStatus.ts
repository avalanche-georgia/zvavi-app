import type { MemberStatus } from '@domain/types'

type MemberWithExpiration = {
  status: MemberStatus
  expiresAt: string | null
}

/**
 * Computes the effective status of a member based on their stored status
 * and expiration date. If a member has an expiresAt date that is in the past,
 * their effective status will be 'expired' regardless of the stored status.
 */
const getEffectiveStatus = (member: MemberWithExpiration): MemberStatus => {
  if (!member.expiresAt) {
    return member.status
  }

  const expirationDate = new Date(member.expiresAt)
  const now = new Date()

  if (expirationDate < now && member.status !== 'expired') {
    return 'expired'
  }

  return member.status
}

export default getEffectiveStatus
