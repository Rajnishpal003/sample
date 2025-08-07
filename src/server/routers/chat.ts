import { GoogleGenerativeAI } from '@google/generative-ai'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      try {
       

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
        const result = await model.generateContent(input)
        const responseText = await result.response.text()


        

        return { response: responseText }
      } catch (error) {
        console.error('Error in sendMessage mutation:', error)
        throw new Error('AI generation failed. Please try again.')
      }
    }),
})
