'use client'

import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

const createParam = 'create'

// The create panel lives in the URL (`?create=1`) like an open record does, so
// Back closes it and a reload keeps it open
const useCreateSheetParam = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const isCreateOpen = searchParams.get(createParam) === '1'

  const setCreateOpen = useCallback(
    (isOpen: boolean) => {
      const params = new URLSearchParams(searchParams.toString())

      if (isOpen) {
        params.set(createParam, '1')
      } else {
        params.delete(createParam)
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const openCreate = useCallback(() => setCreateOpen(true), [setCreateOpen])
  const closeCreate = useCallback(() => setCreateOpen(false), [setCreateOpen])

  return { closeCreate, isCreateOpen, openCreate }
}

export default useCreateSheetParam
