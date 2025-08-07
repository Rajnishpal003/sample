import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
// import { createTRPCContext } from '../../../..//server/context'
import { appRouter } from '../../../../server/index.'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // createContext: () => createTRPCContext(req), // ✅ pass `req` here
  })

export { handler as GET, handler as POST }
