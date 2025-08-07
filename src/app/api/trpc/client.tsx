'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../../../server/index.' // Adjust path to where your appRouter is defined

const trpc = createTRPCReact<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient()
  }
  if (!browserQueryClient) browserQueryClient = new QueryClient()
  return browserQueryClient
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return 'http://localhost:3000'
  })()
  return `${base}/api/trpc`
}

export function TRPCProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
