'use client'

import { createContext, type ReactNode, useContext } from 'react'
import { supabase } from '@data'

type SupabaseContextType = { supabase: typeof supabase }

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export const SupabaseContextProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
}

export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext)

  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }

  return context
}
