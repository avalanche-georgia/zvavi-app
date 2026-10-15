import type { Member } from './types'

export const getMemberName = ({ firstName, lastName }: Pick<Member, 'firstName' | 'lastName'>) =>
  `${firstName} ${lastName}`.trim()
