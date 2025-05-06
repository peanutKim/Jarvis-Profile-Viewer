import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params
    const payload = await getPayload({
      config: configPromise,
    })

    const consultant = await payload.findByID({
      collection: 'consultants',
      id: id,
    })

    return new Response(JSON.stringify(consultant), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching consultant:', error)
    return new Response(JSON.stringify({ error: 'Consultant not found' }), {
      status: 404,
    })
  }
}
