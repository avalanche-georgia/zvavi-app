import type { Partner, PartnerFormData } from '@domain/types'

const getInitialFormData = (partner: Partner | null): PartnerFormData => {
  if (!partner) {
    return {
      benefitEn: '',
      benefitKa: '',
      descriptionEn: '',
      descriptionKa: '',
      isActive: true,
      logoUrl: '',
      nameEn: '',
      nameKa: '',
      tier: null,
      websiteUrl: '',
    }
  }

  return {
    benefitEn: partner.benefitEn ?? '',
    benefitKa: partner.benefitKa ?? '',
    descriptionEn: partner.descriptionEn ?? '',
    descriptionKa: partner.descriptionKa ?? '',
    isActive: partner.isActive,
    logoUrl: partner.logoUrl,
    nameEn: partner.nameEn,
    nameKa: partner.nameKa ?? '',
    tier: partner.tier,
    websiteUrl: partner.websiteUrl,
  }
}

export default getInitialFormData
