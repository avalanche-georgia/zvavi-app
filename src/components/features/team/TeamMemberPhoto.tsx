'use client'

import { useState } from 'react'

import getInitials from '@/lib/getInitials'
import { cn } from '@/lib/utils'

type TeamMemberPhotoProps = {
  avatarUrl: string | null
  // Size and shape (a round avatar in the list, a wide photo in the sheet)
  className: string
  // Initials size, matched to the photo's
  initialsClassName: string
  name: string
}

// Uploaded photo; initials on a brand tint when there is none or it fails to load
const TeamMemberPhoto = ({
  avatarUrl,
  className,
  initialsClassName,
  name,
}: TeamMemberPhotoProps) => {
  const [hasFailed, setHasFailed] = useState(false)

  if (!avatarUrl || hasFailed) {
    return (
      <span
        aria-hidden
        className={cn(
          'bg-primary-soft text-primary-ink grid shrink-0 place-items-center font-bold',
          className,
          initialsClassName,
        )}
      >
        {getInitials(name)}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className={cn('bg-tile shrink-0 object-cover', className)}
      onError={() => setHasFailed(true)}
      src={avatarUrl}
    />
  )
}

export default TeamMemberPhoto
