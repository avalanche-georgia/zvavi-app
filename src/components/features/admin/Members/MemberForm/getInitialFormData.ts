import type { Member, MemberFormData } from '@domain/types'

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
      status: 'active',
    }
  }

  return {
    email: member.email ?? '',
    expiresAt: member.expiresAt ? new Date(member.expiresAt) : null,
    firstName: member.firstName,
    joinedAt: new Date(member.joinedAt),
    lastName: member.lastName,
    memberId: member.memberId,
    notes: member.notes ?? '',
    phone: member.phone ?? '',
    status: member.status,
  }
}

export default getInitialFormData
