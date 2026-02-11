import { convertCamelToSnake } from '@data/helpers'
import { supabase } from '@data/index'

import type { MemberApplicationFormData } from './schema'

export type SubmitResult = { memberId: string; verificationCode: string }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitApplication = async ({ charterAgreed, ...data }: MemberApplicationFormData) => {
  const { address, age, gender, motivation, occupation, ...rest } = data

  const { data: member, error: memberError } = await supabase
    .from('members')
    .insert({
      email: rest.email,
      first_name: rest.firstName,
      last_name: rest.lastName,
      phone: rest.phone,
      status: 'pending',
    })
    .select('id, member_id, verification_code')
    .single()

  if (memberError) throw memberError

  const payload = convertCamelToSnake({
    ...rest,
    address: address || null,
    age: age ? Number(age) : null,
    gender: gender || null,
    memberId: member.id,
    motivation: motivation || null,
    occupation: occupation || null,
  })

  const { error } = await supabase.from('member_applications').insert(payload)

  if (error) throw error

  return {
    memberId: member.member_id,
    verificationCode: member.verification_code,
  } as SubmitResult
}

export default submitApplication
