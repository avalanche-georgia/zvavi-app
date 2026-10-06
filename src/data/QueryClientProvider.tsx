'use client'

import {
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as ClientProvider,
} from '@tanstack/react-query'

import { reportError } from '@/lib/observability'

// The first query-key segment names the data (e.g. 'forecasts'); ids and params are left out
const getQueryScope = (key: readonly unknown[]) => (typeof key[0] === 'string' ? key[0] : undefined)

// Mutation hooks name themselves in meta.scope (minified function names are useless)
const getMutationScope = (meta: Record<string, unknown> | undefined) =>
  typeof meta?.scope === 'string' ? meta.scope : undefined

// A unique-constraint violation is caused by the user's input (e.g. a duplicate), not a bug
const isExpectedMutationError = (error: Error) =>
  error.message.includes('duplicate key value violates unique constraint')

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
        if (isExpectedMutationError(error)) return

        reportError(error, { scope: getMutationScope(mutation.meta) })
      },
    }),
    queryCache: new QueryCache({
      onError: (error, query) => {
        reportError(error, { scope: getQueryScope(query.queryKey) })
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
