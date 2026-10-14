import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { useRouter } from 'src/i18n/navigation'

import useToast from './useToast'

import { reportError } from '@/lib/observability'
import { routes } from '@/routes'

const useSignOut = () => {
  const router = useRouter()
  const { toastError } = useToast()

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      handleSupabaseError(error)
      router.push(routes.auth.login)
    } catch (error) {
      reportError(error, { scope: 'useSignOut' })
      toastError('useSignOut', { error })
    }
  }

  return { signOut }
}

export default useSignOut
