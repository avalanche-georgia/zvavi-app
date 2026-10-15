import type { MemberApplicationFormData } from './schema'

export type SubmitResult = { memberId: string; verificationCode: string }

type ApplicationResponse = Partial<SubmitResult> & { error?: string; ok: boolean }

// The agreements are confirmed in the form; the route only stores the application
const submitApplication = async ({
  charterAgreed, // eslint-disable-line @typescript-eslint/no-unused-vars
  privacyAgreed, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...body
}: MemberApplicationFormData): Promise<SubmitResult> => {
  const response = await fetch('/api/members/applications', {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  const result = (await response.json()) as ApplicationResponse

  if (!result.ok || !result.memberId || !result.verificationCode) {
    throw new Error(result.error ?? `Application failed: ${response.status}`)
  }

  return { memberId: result.memberId, verificationCode: result.verificationCode }
}

export default submitApplication
