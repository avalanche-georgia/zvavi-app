import { useCallback, useState } from 'react'
import { supabase } from '@data'

const bucket = 'partner-logos'
const maxSize = 512 * 1024 // 512 KB
const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']

export type LogoUploadError = 'invalidType' | 'tooLarge' | 'uploadFailed'

type UploadResult = { url: string; error: null } | { url: null; error: LogoUploadError }

type UseLogoUploadResult = {
  isUploading: boolean
  upload: (file: File) => Promise<UploadResult>
}

const useLogoUpload = (): UseLogoUploadResult => {
  const [isUploading, setIsUploading] = useState(false)

  const upload = useCallback(async (file: File): Promise<UploadResult> => {
    if (!allowedTypes.includes(file.type)) {
      return { error: 'invalidType', url: null }
    }

    if (file.size > maxSize) {
      return { error: 'tooLarge', url: null }
    }

    setIsUploading(true)

    try {
      const ext = file.name.includes('.') ? file.name.split('.').pop() : file.type.split('/').pop()
      const path = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)

      return { error: null, url: data.publicUrl }
    } catch {
      return { error: 'uploadFailed', url: null }
    } finally {
      setIsUploading(false)
    }
  }, [])

  return { isUploading, upload }
}

export default useLogoUpload
