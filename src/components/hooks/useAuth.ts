import { useEffect, useState } from 'react'
import { supabase } from '@data'
import type { User } from '@domain/types'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          setErrorMessage(error.message)
        }

        setUser(data.user as User)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        setUser((session?.user as User | undefined) ?? null)
        setIsLoading(false)
      }
    })
  }, [])

  return {
    errorMessage,
    isAuthenticated: Boolean(user),
    isLoading,
    user,
  }
}

export default useAuth
