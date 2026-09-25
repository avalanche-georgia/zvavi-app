'use client'

import { Badge, SegmentedControl } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type ObservationKind = 'avalanche' | 'snowpackTest'

// Only avalanches can be reported today; the disabled tab teases what's next
const keepAvalanche = () => undefined

const ObservationKindTabs = () => {
  const t = useTranslations()

  return (
    <SegmentedControl<ObservationKind>
      ariaLabel={t('observations.submit.kinds.label')}
      className="mb-0.5"
      onChange={keepAvalanche}
      options={[
        { label: t('observations.submit.kinds.avalanche'), value: 'avalanche' },
        {
          ariaLabel: t('observations.submit.kinds.snowpackTestSoon'),
          disabled: true,
          label: (
            <>
              {t('observations.submit.kinds.snowpackTest')}
              <Badge>{t('observations.submit.kinds.soon')}</Badge>
            </>
          ),
          value: 'snowpackTest',
        },
      ]}
      value="avalanche"
    />
  )
}

export default ObservationKindTabs
