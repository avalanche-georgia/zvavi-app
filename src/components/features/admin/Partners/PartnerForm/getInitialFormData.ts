import type { Partner, PartnerFormData } from '@domain/types'

const getInitialFormData = (partner: Partner | null): PartnerFormData => {
  if (!partner) {
    return {
      benefitEn: '',
      benefitKa: '',
      isActive: true,
      logoUrl: '',
      nameEn: '',
      nameKa: '',
      websiteUrl: '',
    }
  }

  return {
    benefitEn: partner.benefitEn ?? '',
    benefitKa: partner.benefitKa ?? '',
    isActive: partner.isActive,
    logoUrl: partner.logoUrl,
    nameEn: partner.nameEn,
    nameKa: partner.nameKa ?? '',
    websiteUrl: partner.websiteUrl ?? '',
  }
}

export default getInitialFormData
