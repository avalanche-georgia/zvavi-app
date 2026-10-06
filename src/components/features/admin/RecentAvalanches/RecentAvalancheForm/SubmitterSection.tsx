'use client'

import { avalancheStatuses } from '@domain/constants'
import type { AvalancheSource, AvalancheStatus } from '@domain/types'
import { FormSelect } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

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
  const statusLabel = t('admin.recentAvalanches.form.labels.status')

  // "Under review" is the moderation state of public submissions only — a team
  // record set to it would drop out of both the catalog and the queue
  const statusOptions = Object.values(avalancheStatuses)
    .filter((status) => status !== 'pending' || source === 'external')
    .map((status) => ({ label: t(`common.avalancheStatuses.${status}`), value: status }))

  return (
    <FormCard
      headerAside={source && <SourceBadge source={source} />}
      title={source ? t('admin.recentAvalanches.form.labels.submitterSection') : statusLabel}
    >
      {source && (
        <SubmitterInfo
          createdByUserId={createdByUserId}
          isExternal={source === 'external'}
          submitterContact={submitterContact}
          submitterEducation={submitterEducation}
          submitterName={submitterName}
        />
      )}
      <FormSelect<AvalancheFormSchema, AvalancheStatus>
        className="max-w-80"
        isLabelHidden={!source}
        label={statusLabel}
        name="status"
        options={statusOptions}
      />
    </FormCard>
  )
}

export default SubmitterSection
