import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { AvalancheForm } from './AvalancheForm'
import { AvalanchePickerModal } from './AvalanchePickerModal'
import { AvalanchesList } from './AvalanchesList'
import useRecentAvalanchesSection from './useRecentAvalanchesSection'
import { initialAvalancheData } from '../constants'

type RecentAvalanchesSectionProps = {
  forecastId?: number
  regionId: RegionId
}

const RecentAvalanchesSection = ({ forecastId, regionId }: RecentAvalanchesSectionProps) => {
  const t = useTranslations()
  const {
    closePicker,
    fields,
    formState,
    handleCreateFormOpen,
    handleDelete,
    handleFormClose,
    handlePickerConfirm,
    handleSubmit,
    isPickerOpen,
    openPicker,
    setFormState,
  } = useRecentAvalanchesSection()

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t('admin.forecast.form.recentAvalanches.title')}</h3>
        <div className="ml-auto flex gap-2">
          <Button disabled={formState !== null} onClick={openPicker} variant="secondary">
            <Icon icon="history" size="sm" />
            {t('admin.forecast.form.recentAvalanches.labels.addFromExisting')}
          </Button>
          <Button disabled={formState !== null} onClick={handleCreateFormOpen}>
            <Icon icon="plus" size="sm" />
            {t('admin.forecast.form.recentAvalanches.labels.addAvalanche')}
          </Button>
        </div>
      </div>

      {formState?.mode === 'create' && (
        <AvalancheForm
          avalancheData={initialAvalancheData}
          onClose={handleFormClose}
          onSave={handleSubmit}
        />
      )}

      <AvalanchesList
        avalanches={fields}
        formState={formState}
        onDelete={handleDelete}
        onFormClose={handleFormClose}
        onFormOpen={setFormState}
        onFormSave={handleSubmit}
      />

      <AvalanchePickerModal
        currentForecastId={forecastId}
        isOpen={isPickerOpen}
        onClose={closePicker}
        onConfirm={handlePickerConfirm}
        regionId={regionId}
      />
    </section>
  )
}

export default RecentAvalanchesSection
