import { useMemo } from 'react'
import { useAvalanchePhotosQuery } from '@data/hooks/recentAvalanches'
import type { Avalanche } from '@domain/types'

const getFileName = (key: string) => key.slice(key.lastIndexOf('/') + 1)

// Preview URLs of the record's saved photos, by photo key. The photos route
// identifies each photo by its file name only, so they're matched back to the
// record's keys here.
const useStoredPhotoUrls = (avalanche: Avalanche | undefined): Record<string, string> => {
  const photoKeys = avalanche?.photoKeys
  const { data: photoUrls } = useAvalanchePhotosQuery({
    enabled: !!avalanche?.id && !!photoKeys?.length,
    id: avalanche?.id ?? 0,
  })

  return useMemo(() => {
    const urlsByFileName = new Map(photoUrls?.map((photo) => [photo.id, photo.previewUrl]))

    return Object.fromEntries(
      (photoKeys ?? []).flatMap((key) => {
        const url = urlsByFileName.get(getFileName(key))

        return url ? [[key, url]] : []
      }),
    )
  }, [photoKeys, photoUrls])
}

export default useStoredPhotoUrls
