'use client'

import { isServer, QueryClient, QueryClientProvider as ClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
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
