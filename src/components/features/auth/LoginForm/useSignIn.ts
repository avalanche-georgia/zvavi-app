import { useState } from 'react'
import { useToast } from '@components/hooks'
import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { userProfilesKeys } from '@data/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'src/i18n/navigation'

import { getSafeReturnPath, returnPathParam } from '@/lib/auth/returnPath'
import { routes } from '@/routes'

// Resolves to whether sign-in worked; on success it moves on to the admin and
// stays busy until the admin page replaces the form
const useSignIn = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toastError } = useToast()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword(credentials)

      handleSupabaseError(error)
      // A profile cached for a previous account in this tab must not drive the admin gate
      queryClient.removeQueries({ queryKey: userProfilesKeys.all })
      setIsRedirecting(true)
      // Back to the admin page that asked for the login, e.g. a member link
      const returnPath = getSafeReturnPath(
        new URLSearchParams(window.location.search).get(returnPathParam),
      )

      router.push(returnPath ?? routes.admin.root)

      return true
    } catch (error) {
      toastError('useSignIn', {
        error,
        message: error instanceof Error ? error.message : undefined,
      })

      return false
    }
  }

  return { isRedirecting, signIn }
}

export default useSignIn
