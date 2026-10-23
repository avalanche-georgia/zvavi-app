import { useEffect, useState } from 'react'
import type { User } from '@domain/types'

import { reportError } from '@/lib/observability'
import { hasAuthCookie, loadSupabase } from '@/lib/supabase/lazyClient'

type Supabase = Awaited<ReturnType<typeof loadSupabase>>

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true
    let unsubscribe: VoidFunction | undefined

    const subscribe = (supabase: Supabase) => {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          setUser((session?.user as User | undefined) ?? null)
          setIsLoading(false)
        }
      })

      unsubscribe = () => data.subscription.unsubscribe()
    }

    const fetchUser = async () => {
      // No session cookie: a visitor — supabase-js is never loaded
      if (!hasAuthCookie()) return setIsLoading(false)

      try {
        // A failed chunk load (stale tab after a deploy, weak signal) lands in catch too
        const supabase = await loadSupabase()
        const { data, error } = await supabase.auth.getUser()

        if (!isActive) return

        if (error) setErrorMessage(error.message)

        setUser(data.user as User)
        subscribe(supabase)
      } catch (error) {
        reportError(error, { scope: 'useAuth' })

        if (isActive) setErrorMessage(error instanceof Error ? error.message : String(error))
      } finally {
        if (isActive) setIsLoading(false)
      }
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
