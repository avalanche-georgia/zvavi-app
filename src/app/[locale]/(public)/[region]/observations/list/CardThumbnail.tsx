import { PhotoPlaceholder } from '@components/features/observations'
import type { PhotoUrls } from '@domain/types'
import { FallbackImage } from '@ds/primitives'

const CardThumbnail = ({ photos }: { photos: PhotoUrls[] }) => {
  const [firstPhoto] = photos

  return (
    <div className="bg-tile rounded-control relative size-16 shrink-0 overflow-hidden">
      <FallbackImage
        className="size-full object-cover"
        fallback={<PhotoPlaceholder />}
        loading="lazy"
        sources={[firstPhoto.thumbUrl, firstPhoto.previewUrl]}
      />
      {photos.length > 1 && (
        <span className="bg-ink/75 rounded-badge text-micro absolute right-1 bottom-1 px-1.25 py-0.5 leading-none font-semibold text-white">
          {photos.length}
        </span>
      )}
    </div>
  )
}

export default CardThumbnail
