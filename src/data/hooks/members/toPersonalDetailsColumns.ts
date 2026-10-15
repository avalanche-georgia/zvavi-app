import type { MemberFormData } from '@domain/types'

type PersonalDetails = Partial<
  Pick<MemberFormData, 'address' | 'gender' | 'motivation' | 'occupation'>
>

// '' → null; undefined stays undefined, so a partial update leaves the column alone
const emptyToNull = (value: string | undefined) =>
  value === undefined ? undefined : value.trim() || null

// Optional details the form keeps as '' are stored as null (gender has a CHECK on its values)
const toPersonalDetailsColumns = ({
  address,
  gender,
  motivation,
  occupation,
}: PersonalDetails) => ({
  address: emptyToNull(address),
  gender: emptyToNull(gender),
  motivation: emptyToNull(motivation),
  occupation: emptyToNull(occupation),
})

export default toPersonalDetailsColumns
