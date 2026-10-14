import { isAfter, parseISO, startOfDay } from 'date-fns'

// The membership ran out before today (its last day still counts)
const isMembershipOver = (expiresAt: string | null, now: Date) =>
  !!expiresAt && isAfter(startOfDay(now), startOfDay(parseISO(expiresAt)))

export default isMembershipOver
