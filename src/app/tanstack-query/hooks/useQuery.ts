import { useEffect } from 'react'
import {
  type QueryKey,
  useQuery as useQueryBase,
  type UseQueryOptions,
} from '@tanstack/react-query'

const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
    errorDescription?: string
  },
) => {
  const data = useQueryBase<TQueryFnData, TError, TData, TQueryKey>({
    ...options,
  })

  useEffect(() => {
    if (!data.error) return

    console.error(options.errorDescription || '', data.error)
  }, [data.error]) // eslint-disable-line react-hooks/exhaustive-deps

  return data
}

export default useQuery
