'use client'

import { DetailSection } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import LinkedForecasts from './LinkedForecasts'
import ViewFacts from './ViewFacts'
import ViewPhotos from './ViewPhotos'
import ViewText from './ViewText'
import ViewTitle from './ViewTitle'
import ViewWhere from './ViewWhere'
import SubmitterInfo from '../RecentAvalancheForm/SubmitterInfo'

// Read-only record, shared by the side panel and the full-page fallback.
// Actions live outside (panel footer / page header).
const AvalancheView = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const {
    createdByUserId = null,
    description,
    forecastAvalanche,
    id,
    involvement,
    photoKeys,
    source,
    status,
    submitterContact = null,
    submitterEducation = null,
    submitterName = null,
  } = avalanche

  return (
    <div className="pb-8">
      {status === 'archived' && (
        <p className="mx-4 mt-4 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
          {t('admin.recentAvalanches.view.archivedHint')}
        </p>
      )}
      <ViewPhotos id={id} photoKeys={photoKeys} />
      <ViewTitle avalanche={avalanche} />
      <ViewFacts avalanche={avalanche} />
      <ViewWhere avalanche={avalanche} />
      <ViewText text={description} title={t('admin.recentAvalanches.form.labels.description')} />
      <ViewText text={involvement} title={t('admin.recentAvalanches.form.labels.involvement')} />

      <DetailSection title={t('admin.recentAvalanches.form.labels.submitterSection')}>
        <SubmitterInfo
          createdByUserId={createdByUserId}
          isExternal={source === 'external'}
          submitterContact={submitterContact}
          submitterEducation={submitterEducation}
          submitterName={submitterName}
        />
      </DetailSection>

      <LinkedForecasts forecastIds={forecastAvalanche.map(({ forecastId }) => forecastId)} />
    </div>
  )
}

export default AvalancheView
