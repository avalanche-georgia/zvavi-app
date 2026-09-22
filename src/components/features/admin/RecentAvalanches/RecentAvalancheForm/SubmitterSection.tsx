'use client'

import { InputBlock, Select, toOptions } from '@components/ui'
import { avalancheStatuses } from '@domain/constants'
import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'
import SubmitterInfo from './SubmitterInfo'

type SubmitterSectionProps = {
  createdByUserId: string | null
  // undefined when creating a new record — source is always 'team' there and not
  // worth showing; only meaningful once a record exists.
  source: AvalancheSource | undefined
  submitterContact: string | null
  submitterEducation: string | null
  submitterName: string | null
}

const SubmitterSection = ({
  createdByUserId,
  source,
  submitterContact,
  submitterEducation,
  submitterName,
}: SubmitterSectionProps) => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()

  const statusOptions = toOptions(avalancheStatuses, (key) => t(`common.avalancheStatuses.${key}`))

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <InputBlock label={t('admin.recentAvalanches.form.labels.status')}>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select onChange={field.onChange} options={statusOptions} value={field.value} />
            )}
          />
        </InputBlock>
      </div>

      {source && (
        <SubmitterInfo
          createdByUserId={createdByUserId}
          isExternal={source === 'external'}
          source={source}
          submitterContact={submitterContact}
          submitterEducation={submitterEducation}
          submitterName={submitterName}
        />
      )}
    </div>
  )
}

export default SubmitterSection
