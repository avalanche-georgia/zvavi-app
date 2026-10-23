import { useEffect, useState } from 'react'
import type { User } from '@domain/types'

import { hasAuthCookie, loadSupabase } from '@/lib/supabase/lazyClient'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    let unsubscribe: VoidFunction | undefined

    const fetchUser = async () => {
      // No session cookie: a visitor — supabase-js is never loaded
      if (!hasAuthCookie()) return setIsLoading(false)

      const supabase = await loadSupabase()

      if (!isActive) return

      try {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          setErrorMessage(error.message)
        }

        setUser(data.user as User)
      } finally {
        setIsLoading(false)
      }

      if (!isActive) return

      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          setUser((session?.user as User | undefined) ?? null)
          setIsLoading(false)
        }
      })

      unsubscribe = () => data.subscription.unsubscribe()
    }

    void fetchUser()

    return () => {
      isActive = false
      unsubscribe?.()
    }
  }, [])

  return {
    errorMessage,
    isAuthenticated: Boolean(user),
    isLoading,
    user,
  }
}

export default useAuth
