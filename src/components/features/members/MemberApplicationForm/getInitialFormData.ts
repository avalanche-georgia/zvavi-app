import type { MemberApplicationFormData } from './schema'

// Agreements and payment method start unset: the schema requires a choice
export const getInitialFormData = (): MemberApplicationFormData => ({
  address: '',
  age: null,
  charterAgreed: undefined as unknown as true,
  email: '',
  firstName: '',
  gender: '',
  lastName: '',
  motivation: '',
  occupation: '',
  paymentMethod: undefined as unknown as MemberApplicationFormData['paymentMethod'],
  phone: '',
  privacyAgreed: undefined as unknown as true,
})
