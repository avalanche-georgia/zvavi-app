'use client'

import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ClientProvider,
} from '@tanstack/react-query'

import { reportError } from '@/lib/observability'

// The first key segment names the data (e.g. 'forecasts'); ids and params are left out
const getScope = (key: readonly unknown[] | undefined) =>
  typeof key?.[0] === 'string' ? key[0] : undefined

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    // Cache-level handlers run even when a hook sets its own onError, and only once a query has
    // exhausted its retries — so every failed request is reported exactly once
    mutationCache: new MutationCache({
      onError: (error, _variables, _onMutateResult, mutation) => {
        reportError(error, { scope: getScope(mutation.options.mutationKey) })
      },
    }),
    queryCache: new QueryCache({
      onError: (error, query) => {
        reportError(error, { scope: getScope(query.queryKey) })
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient()

  return browserQueryClient
}

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient()

  return <ClientProvider client={queryClient}>{children}</ClientProvider>
}

export default QueryClientProvider
