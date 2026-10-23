import { useState } from 'react'
import useDiceBearAvatar from '@components/hooks/useDiceBearAvatar'
import Image from 'next/image'

import { cn } from '@/lib/utils'

type UserAvatarProps = {
  // Size override (default 32px)
  className?: string
  // Uploaded photo; falls back to a generated avatar when missing or broken
  avatarUrl: string | null | undefined
  name: string
  userId: string
}

// Served resized to the largest size the avatar is shown at (36px)
const avatarSize = 36

const UserAvatar = ({ avatarUrl, className, name, userId }: UserAvatarProps) => {
  const fallbackSrc = useDiceBearAvatar(userId)
  // The URL that failed, so a newly uploaded photo is tried again
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  return (
    <Image
      alt={name}
      className={cn('bg-tile size-8 shrink-0 rounded-full object-cover', className)}
      height={avatarSize}
      onError={() => setFailedUrl(avatarUrl ?? null)}
      src={avatarUrl && avatarUrl !== failedUrl ? avatarUrl : fallbackSrc}
      width={avatarSize}
    />
  )
}

export default UserAvatar
