import type { AvalancheSize } from '@domain/types'
import { useTranslations } from 'next-intl'

// What an avalanche of this size can do, as a bullet list
const SizeDetails = ({ size }: { size: AvalancheSize }) => {
  const t = useTranslations()
  // A YAML list — only reachable through t.raw
  const details: unknown = t.raw(
    `forecast.sections.avalancheProblems.modal.info.size.${size}.details`,
  )

  if (!Array.isArray(details)) return null

  return (
    <ul className="list-disc pl-4">
      {details.map((detail: string) => (
        <li key={detail}>{detail}</li>
      ))}
    </ul>
  )
}

export default SizeDetails
