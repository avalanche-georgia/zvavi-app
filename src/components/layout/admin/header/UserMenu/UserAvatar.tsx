import { useDiceBearAvatar } from '@components/hooks'

type UserAvatarProps = {
  // Uploaded photo; falls back to a generated avatar when missing or broken
  avatarUrl: string | null | undefined
  name: string
  userId: string
}

const UserAvatar = ({ avatarUrl, name, userId }: UserAvatarProps) => {
  const fallbackSrc = useDiceBearAvatar(userId)

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = fallbackSrc
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={name}
      className="bg-tile size-8 shrink-0 rounded-full object-cover"
      onError={handleImageError}
      src={avatarUrl ?? fallbackSrc}
    />
  )
}

export default UserAvatar
