'use client'

import { InputBlock, Select, toOptions } from '@components/ui'
import { avalancheStatuses } from '@domain/constants'
import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'
import SubmitterInfo from './SubmitterInfo'
import SourceBadge from '../RecentAvalanchesTable/SourceBadge'

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

  // "Under review" is the moderation state of public submissions only — a team
  // record set to it would drop out of both the catalog and the queue
  const statusOptions = toOptions(avalancheStatuses, (key) =>
    t(`common.avalancheStatuses.${key}`),
  ).filter(({ value }) => value !== 'pending' || source === 'external')

  const statusField = (
    <InputBlock label={t('admin.recentAvalanches.form.labels.status')}>
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <Select onChange={field.onChange} options={statusOptions} value={field.value} />
        )}
      />
    </InputBlock>
  )

  if (!source) return <div className="grid grid-cols-2 gap-3">{statusField}</div>

  return (
    <div className="grid grid-cols-2 items-start gap-3">
      <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            {t('admin.recentAvalanches.form.labels.submitterSection')}
          </span>
          <SourceBadge source={source} />
        </div>

        <SubmitterInfo
          createdByUserId={createdByUserId}
          isExternal={source === 'external'}
          submitterContact={submitterContact}
          submitterEducation={submitterEducation}
          submitterName={submitterName}
        />
      </div>

      {statusField}
    </div>
  )
}

export default SubmitterSection
