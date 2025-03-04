import {router, publicProcedure} from '../trpc'
import {z} from '../../../../node_modules/zod'

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({text: z.string().nullish()}).nullish())
    .query(({input}) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      }
    }),
})
