import { PhotoStrip } from '@components/features/observations'
import { Spinner } from '@components/ui'
import { useAvalanchePhotosQuery } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

type ViewPhotosProps = {
  id: number
  photoKeys?: string[] | null
}

// Resized variants, same as the public page — they appear a few seconds after
// submit, until then the strip shows placeholders
const ViewPhotos = ({ id, photoKeys }: ViewPhotosProps) => {
  const t = useTranslations()
  const hasPhotos = (photoKeys?.length ?? 0) > 0
  const { data: photos, isError, isPending } = useAvalanchePhotosQuery({ enabled: hasPhotos, id })

  if (!hasPhotos) return null

  if (isPending) {
    return (
      <div className="flex justify-center px-4 pt-4">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-muted px-4 pt-4 text-sm">{t('admin.recentAvalanches.view.photosError')}</p>
    )
  }

  return <PhotoStrip photos={photos} />
}

export default ViewPhotos
