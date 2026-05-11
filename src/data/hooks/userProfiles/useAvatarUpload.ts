import { useCallback, useState } from 'react'
import { supabase } from '@data'
import { userProfilesKeys } from '@data/query-keys'
import { useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const bucket = 'avatars'
const maxSize = 5 * 1024 * 1024 // 5 MB
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
const mimeToExt: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export type AvatarUploadError = 'invalidType' | 'tooLarge' | 'uploadFailed'

type UploadResult = { url: string; error: null } | { url: null; error: AvatarUploadError }

const extractStoragePath = (url: string): string | null => {
  const marker = `/storage/v1/object/public/${bucket}/`
  const idx = url.indexOf(marker)

  if (idx === -1) return null
  const pathWithParams = url.slice(idx + marker.length)

  return pathWithParams.split('?')[0]
}

type UseAvatarUploadResult = {
  isUploading: boolean
  upload: (userId: string, file: File, previousUrl?: string | null) => Promise<UploadResult>
}

const useAvatarUpload = (): UseAvatarUploadResult => {
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()

  const upload = useCallback(
    async (userId: string, file: File, previousUrl?: string | null): Promise<UploadResult> => {
      if (!allowedTypes.includes(file.type)) {
        return { error: 'invalidType', url: null }
      }

      if (file.size > maxSize) {
        return { error: 'tooLarge', url: null }
      }

      setIsUploading(true)

      try {
        const ext = mimeToExt[file.type]!
        const path = `${userId}/${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
          upsert: true,
        })

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from(bucket).getPublicUrl(path)

        const { error: dbError } = await supabase
          .from('user_profiles')
          .update({ avatar_url: data.publicUrl })
          .eq('id', userId)

        handleSupabaseError(dbError)

        if (previousUrl) {
          const oldPath = extractStoragePath(previousUrl)

          if (oldPath) {
            setTimeout(() => {
              void supabase.storage.from(bucket).remove([oldPath])
            }, 3000)
          }
        }

        void queryClient.invalidateQueries({ queryKey: userProfilesKeys.current() })

        return { error: null, url: data.publicUrl }
      } catch {
        return { error: 'uploadFailed', url: null }
      } finally {
        setIsUploading(false)
      }
    },
    [queryClient],
  )

  return { isUploading, upload }
}

export default useAvatarUpload
