import { Loading } from '@components/features/admin/shared'
import { PhotoStrip } from '@components/features/observations'
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
    return <Loading />
  }

  if (isError) {
    return (
      <p className="text-muted text-copy px-4 pt-4">
        {t('admin.recentAvalanches.view.photosError')}
      </p>
    )
  }

  return <PhotoStrip photos={photos} />
}

export default ViewPhotos
