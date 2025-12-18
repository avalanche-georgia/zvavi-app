import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  const secret = req.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  revalidatePath('/en/partners')
  revalidatePath('/ka/partners')

  return Response.json({ ok: true })
}
