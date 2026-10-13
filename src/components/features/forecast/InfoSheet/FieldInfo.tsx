import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import InfoSection from './InfoSection'
import ScaleItem from './ScaleItem'
import type { ProblemField } from './types'
import useFieldInfo from './useFieldInfo'

type FieldInfoProps = {
  field: ProblemField
  problem: Problem
}

// Explains one property of a problem (size, sensitivity, …) with its scale
const FieldInfo = ({ field, problem }: FieldInfoProps) => {
  const t = useTranslations()
  const { items, lead, listTitle, title } = useFieldInfo(field, problem)

  return (
    <>
      <div className="px-4 pt-4">
        <h2 className="text-ink m-0 text-[21px] leading-tight font-bold tracking-[-.02em]">
          {title}
        </h2>
        <p className="text-muted text-copy-sm mt-0.5">
          {t(`common.avalancheTypes.${problem.type}`)}
        </p>
      </div>
      {lead && <p className="text-ink text-copy-lg mx-4 mt-3.5 leading-[1.55]">{lead}</p>}
      <InfoSection title={listTitle}>
        <ul className="flex flex-col gap-1.5">
          {items.map(({ badge, description, isCurrent, name }) => (
            <ScaleItem
              key={badge}
              badge={badge}
              currentLabel={isCurrent ? t('forecast.page.thisProblem') : undefined}
              description={description}
              name={name}
            />
          ))}
        </ul>
      </InfoSection>
    </>
  )
}

export default FieldInfo
