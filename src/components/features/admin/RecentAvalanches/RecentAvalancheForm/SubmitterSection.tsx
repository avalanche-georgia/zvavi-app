'use client'

import { InputBlock, Select, Textarea, TextInput, toOptions } from '@components/ui'
import { avalancheStatuses } from '@domain/constants'
import type { AvalancheSource } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'
import SourceBadge from '../RecentAvalanchesTable/SourceBadge'

type SubmitterSectionProps = {
  isExternal: boolean
  source: AvalancheSource
}

const SubmitterSection = ({ isExternal, source }: SubmitterSectionProps) => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()

  const statusOptions = toOptions(avalancheStatuses, (key) => t(`common.avalancheStatuses.${key}`))

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 items-end gap-3">
        <InputBlock label={t('admin.recentAvalanches.form.labels.source')}>
          <SourceBadge source={source} />
        </InputBlock>

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

      {isExternal && (
        <div className="grid grid-cols-2 gap-3">
          <InputBlock label={t('admin.recentAvalanches.form.labels.submitterName')}>
            <Controller
              control={form.control}
              name="submitterName"
              render={({ field }) => (
                <TextInput onChange={field.onChange} value={field.value ?? ''} />
              )}
            />
          </InputBlock>

          <InputBlock label={t('admin.recentAvalanches.form.labels.submitterEducation')}>
            <Controller
              control={form.control}
              name="submitterEducation"
              render={({ field }) => (
                <TextInput onChange={field.onChange} value={field.value ?? ''} />
              )}
            />
          </InputBlock>

          <div className="col-span-2">
            <InputBlock label={t('admin.recentAvalanches.form.labels.submitterContact')}>
              <Controller
                control={form.control}
                name="submitterContact"
                render={({ field }) => (
                  <Textarea onChange={field.onChange} rows={2} value={field.value ?? ''} />
                )}
              />
            </InputBlock>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitterSection
