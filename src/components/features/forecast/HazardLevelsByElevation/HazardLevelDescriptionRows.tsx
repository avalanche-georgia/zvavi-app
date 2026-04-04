'use client'

import { useTranslations } from 'next-intl'

export const descriptionLabelKeys = ['travelAdvice', 'likelihood', 'sizeAndDistribution'] as const

export type LabelKey = (typeof descriptionLabelKeys)[number]

const TravelAdviceText = ({ text }: { text: string }) => {
  const dot = text.indexOf('. ')

  if (dot === -1) return <span className="font-semibold">{text}</span>

  return (
    <>
      <span className="font-semibold">{text.slice(0, dot + 1)}</span> {text.slice(dot + 2)}
    </>
  )
}

type DescriptionRowProps = {
  labelKey: LabelKey
  text: string
}

const DescriptionRow = ({ labelKey, text }: DescriptionRowProps) => {
  const t = useTranslations()

  return (
    <div>
      <dt className="mb-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
        {t(`forecast.hazardLevels.descriptionLabels.${labelKey}`)}
      </dt>
      <dd className="text-sm leading-relaxed text-gray-700">
        {labelKey === 'travelAdvice' ? <TravelAdviceText text={text} /> : text}
      </dd>
    </div>
  )
}

export default DescriptionRow
