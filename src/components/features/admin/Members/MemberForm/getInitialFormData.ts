import type { Member, MemberFormData } from '@domain/types'
import { parseISO } from 'date-fns'

// Stored dates are date-only: parseISO keeps them on the same calendar day locally
const getInitialFormData = (member: Member | null): MemberFormData => {
  if (!member) {
    return {
      email: '',
      expiresAt: null,
      firstName: '',
      joinedAt: new Date(),
      lastName: '',
      memberId: '',
      notes: '',
      phone: '',
      status: 'pending',
    }
  }

  return {
    email: member.email ?? '',
    expiresAt: member.expiresAt ? parseISO(member.expiresAt) : null,
    firstName: member.firstName,
    joinedAt: parseISO(member.joinedAt),
    lastName: member.lastName,
    memberId: member.memberId,
    notes: member.notes ?? '',
    phone: member.phone ?? '',
    status: member.status,
  }
}

export default getInitialFormData
