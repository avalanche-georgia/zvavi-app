'use client'

import { useRef, useState } from 'react'
import { useToast } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import { useAvatarUpload } from '@data/hooks/userProfiles'
import type { UserProfile } from '@domain/types'
import { LoaderIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

type AvatarUploadProps = {
  profile: UserProfile
}

const AvatarUpload = ({ profile }: AvatarUploadProps) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { isUploading, upload } = useAvatarUpload()
  const inputRef = useRef<HTMLInputElement>(null)

  const { avatarUrl, fullName, id } = profile

  const dicebearSrc = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${id}`
  const avatarSrc = avatarUrl ?? dicebearSrc

  const [isImageLoading, setIsImageLoading] = useState(true)
  const isLoading = isUploading || isImageLoading

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setIsImageLoading(true)

    const result = await upload(id, file, avatarUrl)

    if (!result.error) {
      toastSuccess(t('admin.profile.messages.avatarUpdated'))

      return
    }

    toastError('AvatarUpload | handleFileChange', {
      error: result.error,
      message: t(`admin.profile.form.errors.avatar.${result.error}`),
    })
    setIsImageLoading(false)

    event.target.value = ''
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    ;(e.currentTarget as HTMLImageElement).src = dicebearSrc
    setIsImageLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative size-34 overflow-hidden rounded-2xl bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={fullName}
          className={isLoading ? 'invisible size-full object-cover' : 'size-full object-cover'}
          onError={handleImageError}
          onLoad={() => setIsImageLoading(false)}
          src={avatarSrc}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderIcon className="text-primary size-5 animate-spin" />
          </div>
        )}
      </div>

      <Button disabled={isLoading} onClick={() => inputRef.current?.click()} variant="outline">
        <Icon icon="upload" size="sm" />
        {avatarUrl
          ? t('admin.profile.form.actions.avatarReplace')
          : t('admin.profile.form.actions.avatarUpload')}
      </Button>

      <p className="text-xs text-gray-500">{t('admin.profile.form.hints.avatar')}</p>

      <input
        ref={inputRef}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        type="file"
      />
    </div>
  )
}

export default AvatarUpload
