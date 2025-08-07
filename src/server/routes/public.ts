import { router, publicProcedure } from '../trpc'

export const publicRouter = router({
  ping: publicProcedure.query(() => {
    return 'pong'
  }),
})
