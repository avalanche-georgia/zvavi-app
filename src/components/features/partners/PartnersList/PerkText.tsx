import { useTranslations } from 'next-intl'

// Inherits the green of the callout / tip around it
const perkBold = (chunks: React.ReactNode) => <b className="font-semibold">{chunks}</b>

// "Perk: 10% off rentals"
const PerkText = ({ benefit }: { benefit: string }) => {
  const t = useTranslations()

  return <span>{t.rich('partners.page.perk', { b: perkBold, benefit })}</span>
}

export default PerkText
