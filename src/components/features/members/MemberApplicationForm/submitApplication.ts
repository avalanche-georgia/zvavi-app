import { supabase } from '@data/index'

import type { MemberApplicationFormData } from './schema'

export type SubmitResult = { memberId: string; verificationCode: string }

const notifyAdmin = (name: string, email: string, paymentMethod: string) => {
  fetch('/api/notify/new-application', {
    body: JSON.stringify({ email, name, paymentMethod }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  }).catch(() => {})
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitApplication = async ({ charterAgreed, ...data }: MemberApplicationFormData) => {
  const { address, age, gender, motivation, occupation, ...rest } = data

  const { data: result, error } = await supabase.rpc('submit_member_application', {
    p_address: address || null,
    p_age: age ? Number(age) : null,
    p_email: rest.email,
    p_first_name: rest.firstName,
    p_gender: gender || null,
    p_last_name: rest.lastName,
    p_motivation: motivation || null,
    p_occupation: occupation || null,
    p_payment_method: rest.paymentMethod,
    p_phone: rest.phone,
  })

  if (error) throw error

  notifyAdmin(`${rest.firstName} ${rest.lastName}`, rest.email, rest.paymentMethod)

  return result as SubmitResult
}

export default submitApplication
