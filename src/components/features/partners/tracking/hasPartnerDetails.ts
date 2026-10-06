import type { Partner } from '@domain/types'

// A partner with details opens a drawer; otherwise its badge links straight to the website
const hasPartnerDetails = (partner: Partner) =>
  Boolean(partner.benefitEn || partner.benefitKa || partner.descriptionEn || partner.descriptionKa)

export default hasPartnerDetails
