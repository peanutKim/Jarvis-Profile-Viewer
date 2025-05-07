import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (req: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  // Parse query parameters from the request URL
  const url = new URL(req.url)
  const query = Object.fromEntries(url.searchParams.entries())

  const parsedQueryOpts: Record<string, { equals: string }> = {}

  Object.entries(query).forEach(([key, value]) => {
    parsedQueryOpts[key] = {
      equals: value,
    }
  })

  const data = await payload.find({
    collection: 'consultants',
    where: parsedQueryOpts,
  })

  return Response.json(data)
}
