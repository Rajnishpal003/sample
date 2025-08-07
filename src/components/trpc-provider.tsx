// app/_trpc/Provider.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, trpcClient } from '../trpc'
import { ReactNode, useState } from 'react'

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
