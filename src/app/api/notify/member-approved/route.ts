import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type RequestBody = {
  email: string
  name: string
  verificationUrl: string
}

const buildEmailHtml = (name: string, verificationUrl: string) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

<tr><td style="background:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0">
  <img src="https://avalanche.ge/images/logo.png" alt="Avalanche Georgia" width="120" style="display:block;margin:0 auto"/>
  <p style="margin:12px 0 0;font-size:20px;font-weight:bold;color:#FF6F00">Avalanche Georgia</p>
</td></tr>

<tr><td style="background:#fff;padding:32px 24px;border-radius:0 0 8px 8px">
  <p style="margin:0 0 16px;font-size:16px;color:#1a1a1a">Hi ${name},</p>
  <p style="margin:0 0 16px;font-size:16px;color:#333">Your membership application has been approved!</p>
  <p style="margin:0 0 16px;font-size:16px;color:#333">Welcome to Avalanche Georgia.</p>
  <p style="margin:0 0 24px;font-size:16px;color:#333">You can view your membership details below:</p>
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <a href="${verificationUrl}" style="display:inline-block;padding:14px 32px;background:#FF6F00;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;border-radius:6px">View Membership</a>
  </td></tr></table>
  <p style="margin:24px 0 0;font-size:13px;color:#888;word-break:break-all">
    Or copy this link: <a href="${verificationUrl}" style="color:#FF6F00">${verificationUrl}</a>
  </p>
</td></tr>

<tr><td style="padding:24px;text-align:center">
  <p style="margin:0 0 8px;font-size:13px;color:#888">Questions? Contact us at zvavisaqartvelo@gmail.com</p>
  <p style="margin:0;font-size:13px;color:#888">Stay safe in the mountains! — Avalanche Georgia Team</p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`

export const POST = async (request: Request) => {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { email, name, verificationUrl } = (await request.json()) as RequestBody

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Avalanche Georgia <noreply@avalanche.ge>',
      html: buildEmailHtml(name, verificationUrl),
      subject: 'Your Avalanche Georgia membership has been approved!',
      to: email,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Resend notify] Error:', error)
  }

  return NextResponse.json({ ok: true })
}
