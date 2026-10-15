import type { MemberApplicationFormSchema } from './schema'

// Agreements and payment method stay unset until the applicant chooses
export const getInitialFormData = (): MemberApplicationFormSchema => ({
  address: '',
  age: null,
  charterAgreed: undefined,
  email: '',
  firstName: '',
  gender: '',
  lastName: '',
  motivation: '',
  occupation: '',
  paymentMethod: undefined,
  phone: '',
  privacyAgreed: undefined,
})
