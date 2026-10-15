import type { Member, MemberFormData } from '@domain/types'
import { parseISO } from 'date-fns'

// Stored dates are date-only: parseISO keeps them on the same calendar day locally
const getInitialFormData = (member: Member | null): MemberFormData => {
  if (!member) {
    return {
      address: '',
      age: null,
      email: '',
      expiresAt: null,
      firstName: '',
      gender: '',
      joinedAt: new Date(),
      lastName: '',
      memberId: '',
      motivation: '',
      notes: '',
      occupation: '',
      phone: '',
      status: 'pending',
    }
  }

  return {
    address: member.address ?? '',
    age: member.age,
    email: member.email ?? '',
    expiresAt: member.expiresAt ? parseISO(member.expiresAt) : null,
    firstName: member.firstName,
    gender: member.gender ?? '',
    joinedAt: parseISO(member.joinedAt),
    lastName: member.lastName,
    memberId: member.memberId,
    motivation: member.motivation ?? '',
    notes: member.notes ?? '',
    occupation: member.occupation ?? '',
    phone: member.phone ?? '',
    status: member.status,
  }
}

export default getInitialFormData
