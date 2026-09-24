import { PhotoPlaceholder } from '@components/features/observations'
import { FallbackImage } from '@components/ui'
import type { PhotoUrls } from '@domain/types'

const CardThumbnail = ({ photos }: { photos: PhotoUrls[] }) => {
  const [firstPhoto] = photos

  return (
    <div className="bg-tile relative size-16 shrink-0 overflow-hidden rounded-[10px]">
      <FallbackImage
        className="size-full object-cover"
        fallback={<PhotoPlaceholder />}
        loading="lazy"
        sources={[firstPhoto.thumbUrl, firstPhoto.previewUrl]}
      />
      {photos.length > 1 && (
        <span className="bg-ink/75 absolute right-1 bottom-1 rounded-[5px] px-1.25 py-0.5 text-[11px] leading-none font-semibold text-white">
          {photos.length}
        </span>
      )}
    </div>
  )
}

export default CardThumbnail
