import { createContext, useContext } from 'react'

import type { MemberSheetMode } from '../../MemberSheet'

type MembersTableContextValue = {
  onMemberOpen: (id: string, mode?: MemberSheetMode) => void
}

// Values the cells need while the columns stay module-level (stable cell components)
export const MembersTableContext = createContext<MembersTableContextValue | null>(null)

export const useMembersTable = () => {
  const value = useContext(MembersTableContext)

  if (!value) throw new Error('useMembersTable must be used inside MembersTableContext')

  return value
}
