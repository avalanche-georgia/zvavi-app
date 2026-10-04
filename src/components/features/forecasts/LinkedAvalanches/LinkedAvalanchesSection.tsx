'use client'

import { useLinkableAvalanchesQuery } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import AvalancheSheets from './AvalancheSheets'
import LinkedAvalancheItem from './LinkedAvalancheItem'
import LinkedAvalanchesActions from './LinkedAvalanchesActions'
import LinkedAvalanchesEmpty from './LinkedAvalanchesEmpty'
import useAvalancheSheets from './useAvalancheSheets'
import useLinkedAvalanches from './useLinkedAvalanches'

type LinkedAvalanchesSectionProps = {
  forecastId: number | undefined
  regionId: RegionId
  sectionId: string
}

// Recent avalanches = links to real catalog records. Editing a record changes
// it everywhere; removing one only unlinks it from this forecast.
const LinkedAvalanchesSection = ({
  forecastId,
  regionId,
  sectionId,
}: LinkedAvalanchesSectionProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches'
  const catalogName = t(`${key}.catalog`, { region: t(`regions.names.${regionId}`) })
  const { data: avalanches = [], isPending } = useLinkableAvalanchesQuery({ regionId })
  const { drop, isSaved, link, linkedIds, unlink } = useLinkedAvalanches(forecastId !== undefined)
  const sheets = useAvalancheSheets()
  const isEmpty = linkedIds.length === 0

  return (
    <FormCard
      actions={
        !isEmpty && (
          <LinkedAvalanchesActions onAddExisting={sheets.openPicker} onCreate={sheets.openCreate} />
        )
      }
      description={t(`${key}.description`, { catalog: catalogName })}
      sectionId={sectionId}
      title={t(`${key}.title`)}
      titleTag={
        <span className="rounded-badge bg-accent-soft text-micro text-accent-hover px-1.5 py-0.5 font-semibold uppercase">
          {t(`${key}.scopeTag`)}
        </span>
      }
    >
      {isEmpty ? (
        <LinkedAvalanchesEmpty
          catalogName={catalogName}
          onAddExisting={sheets.openPicker}
          onCreate={sheets.openCreate}
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {linkedIds.map((id) => (
            <li key={id}>
              <LinkedAvalancheItem
                forecastId={forecastId}
                id={id}
                isSaved={isSaved(id)}
                listed={avalanches.find((avalanche) => avalanche.id === id)}
                onEdit={() => sheets.openEdit(id)}
                onMissing={() => drop(id)}
                onRemove={() => unlink(id)}
                onView={() => sheets.openView(id)}
              />
            </li>
          ))}
        </ul>
      )}
      <AvalancheSheets
        avalanches={avalanches}
        catalogName={catalogName}
        isPending={isPending}
        linkedIds={linkedIds}
        onClose={sheets.close}
        onDeleted={drop}
        onLink={link}
        onReopen={sheets.openEdit}
        regionId={regionId}
        sheet={sheets.sheet}
      />
    </FormCard>
  )
}

export default LinkedAvalanchesSection
