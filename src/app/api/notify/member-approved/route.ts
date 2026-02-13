import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type RequestBody = {
  email: string
  name: string
  verificationUrl: string
}

export const POST = async (request: Request) => {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { email, name, verificationUrl } = (await request.json()) as RequestBody

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Avalanche Georgia <noreply@avalanche.ge>',
      html: [
        `<p>Hi ${name},</p>`,
        '<p>Your membership application has been approved! Welcome to Avalanche Georgia.</p>',
        `<p>You can check your membership status anytime here:<br/>`,
        `<a href="${verificationUrl}">${verificationUrl}</a></p>`,
        '<p>If you have any questions, feel free to reach out to us at zvavisaqartvelo@gmail.com</p>',
        '<p>Stay safe in the mountains!</p>',
        '<p>— Avalanche Georgia Team</p>',
      ].join('\n'),
      subject: 'Your Avalanche Georgia membership has been approved!',
      to: email,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Resend notify] Error:', error)
  }

  return NextResponse.json({ ok: true })
}
