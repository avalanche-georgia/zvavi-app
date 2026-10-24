import { handleSupabaseError } from '@data/helpers'
import { userProfilesKeys } from '@data/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'src/i18n/navigation'

import useToast from './useToast'

import { reportError } from '@/lib/observability'
import { loadSupabase } from '@/lib/supabase/lazyClient'
import { routes } from '@/routes'

const useSignOut = () => {
  const router = useRouter()
  const { toastError } = useToast()
  const queryClient = useQueryClient()

  const signOut = async () => {
    try {
      const supabase = await loadSupabase()
      const { error } = await supabase.auth.signOut()

      handleSupabaseError(error)
      // The next user in this tab must not see this one's profile
      queryClient.removeQueries({ queryKey: userProfilesKeys.all })
      router.push(routes.auth.login)
    } catch (error) {
      reportError(error, { scope: 'useSignOut' })
      toastError('useSignOut', { error })
    }
  }

  return { signOut }
}

export default useSignOut
