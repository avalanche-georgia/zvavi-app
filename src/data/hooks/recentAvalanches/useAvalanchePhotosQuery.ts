import { photoUrlsStaleTime } from '@data/hooks/observations/requestPublicObservations'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { PhotoUrls } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

type PhotosResponse = { error?: string; ok: boolean; photos?: PhotoUrls[] }

const fetchAvalanchePhotos = async (id: number): Promise<PhotoUrls[]> => {
  const response = await fetch(`/api/admin/recent-avalanches/${id}/photos`)
  const body = (await response.json()) as PhotosResponse

  if (!response.ok || !body.ok) throw new Error(body.error ?? 'failed to fetch photos')

  return body.photos ?? []
}

// Signed URLs expire — refetch well before that, also while the panel sits open
const useAvalanchePhotosQuery = ({ enabled, id }: { enabled: boolean; id: number }) =>
  useQuery({
    enabled,
    queryFn: () => fetchAvalanchePhotos(id),
    queryKey: recentAvalanchesKeys.photos(id),
    refetchInterval: photoUrlsStaleTime,
    staleTime: photoUrlsStaleTime,
  })

export default useAvalanchePhotosQuery
