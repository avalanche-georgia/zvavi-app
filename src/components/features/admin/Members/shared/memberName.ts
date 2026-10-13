import type { Member } from '@domain/types'

export const getMemberName = ({ firstName, lastName }: Pick<Member, 'firstName' | 'lastName'>) =>
  `${firstName} ${lastName}`.trim()
