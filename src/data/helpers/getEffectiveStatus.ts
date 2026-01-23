import type { MemberStatus } from '@domain/types'
import { isAfter, parseISO, startOfDay } from 'date-fns'

type MemberWithExpiration = {
  status: MemberStatus
  expiresAt: string | null
}

/**
 * Temp Solution until improved on BE:
 * Computes the effective status of a member based on their stored status
 * and expiration date. A member is considered expired only AFTER their
 * expiration date (e.g., expiresAt = "21 Feb" is valid until 21 Feb 23:59,
 * becomes expired on 22 Feb 00:00).
 */
const getEffectiveStatus = (member: MemberWithExpiration): MemberStatus => {
  if (!member.expiresAt) {
    return member.status
  }

  const today = startOfDay(new Date())
  const expirationDate = startOfDay(parseISO(member.expiresAt))
  const isExpired = isAfter(today, expirationDate)

  if (isExpired && member.status !== 'expired') {
    return 'expired'
  }

  return member.status
}

export default getEffectiveStatus
