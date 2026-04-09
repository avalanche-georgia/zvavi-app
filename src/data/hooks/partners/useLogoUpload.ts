import { useCallback, useState } from 'react'
import { supabase } from '@data'

const bucket = 'partner-logos'
const maxSize = 512 * 1024 // 512 KB
const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

export type LogoUploadError = 'invalidType' | 'tooLarge' | 'uploadFailed'

type UseLogoUploadResult = {
  error: LogoUploadError | null
  isUploading: boolean
  upload: (file: File) => Promise<string | null>
}

const useLogoUpload = (): UseLogoUploadResult => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<LogoUploadError | null>(null)

  const upload = useCallback(async (file: File): Promise<string | null> => {
    setError(null)

    if (!allowedTypes.includes(file.type)) {
      setError('invalidType')

      return null
    }

    if (file.size > maxSize) {
      setError('tooLarge')

      return null
    }

    setIsUploading(true)

    try {
      const ext = file.name.includes('.') ? file.name.split('.').pop() : file.type.split('/').pop()
      const path = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)

      return data.publicUrl
    } catch {
      setError('uploadFailed')

      return null
    } finally {
      setIsUploading(false)
    }
  }, [])

  return { error, isUploading, upload }
}

export default useLogoUpload
