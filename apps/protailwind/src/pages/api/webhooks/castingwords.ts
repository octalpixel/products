import * as Sentry from '@sentry/nextjs'
import {withSentry} from '@sentry/nextjs'
import {NextApiRequest, NextApiResponse} from 'next'
import {z} from 'zod'
import {writeTranscriptToVideoResource} from 'lib/sanity'

const CastingwordsWebhookBody = z.object({
  audiofile: z.string(),
  order: z.string(),
})

const castingwordsWebhookReceiver = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    if (req.body.event === 'TRANSCRIPT_COMPLETE') {
      try {
        const {audiofile, order} = CastingwordsWebhookBody.parse(req.body)
        await writeTranscriptToVideoResource(audiofile, order)
        res.status(200).json({message: 'video resource updated'})
      } catch (e) {
        Sentry.captureException(e)
        res.status(500).json({
          message: `Invalid query for Sanity document`,
        })
      }
    } else {
      res.status(200).end()
    }
  } else {
    res.status(404).end()
  }
}

export default withSentry(castingwordsWebhookReceiver)

export const config = {
  api: {
    externalResolver: true,
  },
}
