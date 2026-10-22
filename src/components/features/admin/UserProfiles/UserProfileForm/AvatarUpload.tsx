'use client'

import { useRef, useState } from 'react'
import { useToast } from '@components/hooks'
import useDiceBearAvatar from '@components/hooks/useDiceBearAvatar'
import { useAvatarUpload } from '@data/hooks/userProfiles'
import type { UserProfile } from '@domain/types'
import { Button, Spinner } from '@ds/primitives'
import { Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

const acceptedTypes = 'image/jpeg,image/png,image/webp'

// The profile photo with its own upload: it saves at once, apart from the form
const AvatarUpload = ({ profile }: { profile: UserProfile }) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { isUploading, upload } = useAvatarUpload()
  const inputRef = useRef<HTMLInputElement>(null)
  const { avatarUrl, fullName, id } = profile
  const diceBearSrc = useDiceBearAvatar(id)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const isLoading = isUploading || isImageLoading

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target
    const file = input.files?.[0]

    if (!file) return

    setIsImageLoading(true)

    const result = await upload(id, file, avatarUrl)

    // The same file can be picked again after an error
    input.value = ''

    if (!result.error) return void toastSuccess(t('admin.profile.messages.avatarUpdated'))

    toastError('AvatarUpload | handleFileChange', {
      error: result.error,
      message: t(`admin.profile.form.errors.avatar.${result.error}`),
    })
    setIsImageLoading(false)
  }

  // A broken photo falls back to the generated avatar
  const handleImageError = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement>) => {
    currentTarget.src = diceBearSrc
    setIsImageLoading(false)
  }

  return (
    <div className="flex shrink-0 flex-col items-center gap-3">
      <div className="rounded-card bg-tile relative size-34 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={fullName ?? ''}
          className={cn('size-full object-cover', isLoading && 'invisible')}
          onError={handleImageError}
          onLoad={() => setIsImageLoading(false)}
          src={avatarUrl ?? diceBearSrc}
        />
        {isLoading && (
          <div className="absolute inset-0 grid place-items-center">
            <Spinner className="text-muted" />
          </div>
        )}
      </div>

      <Button
        disabled={isLoading}
        onClick={() => inputRef.current?.click()}
        size="sm"
        variant="secondary"
      >
        <Upload aria-hidden className="size-4" />
        {t(`admin.profile.form.actions.${avatarUrl ? 'avatarReplace' : 'avatarUpload'}`)}
      </Button>
      <p className="text-caption text-muted">{t('admin.profile.form.hints.avatar')}</p>

      <input
        ref={inputRef}
        accept={acceptedTypes}
        className="hidden"
        onChange={handleFileChange}
        tabIndex={-1}
        type="file"
      />
    </div>
  )
}

export default AvatarUpload
