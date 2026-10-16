import { useLocalizeField } from '@components/hooks'
import type { Partner } from '@domain/types'

// A partner's name, description and perk in the current language ('' when unset)
const usePartnerFields = (partner: Partner) => {
  const localizeField = useLocalizeField()

  return {
    benefit: localizeField(partner.benefitEn ?? '', partner.benefitKa),
    description: localizeField(partner.descriptionEn ?? '', partner.descriptionKa),
    name: localizeField(partner.nameEn, partner.nameKa),
  }
}

export default usePartnerFields
