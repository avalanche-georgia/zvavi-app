'use client'

import { useRegionContext } from '@domain/context/RegionContext'
import { SuccessState } from '@ds/patterns'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import { routes } from '@/routes'

const SubmitSuccess = ({ onSubmitAnother }: { onSubmitAnother: () => void }) => {
  const t = useTranslations()
  const router = useRouter()
  const { region } = useRegionContext()

  const handleViewObservations = () => router.push(routes.observationsByRegion(region!.id).root)

  return (
    <SuccessState
      actions={
        <>
          <Button onClick={onSubmitAnother} size="lg" variant="secondary">
            {t('observations.submit.success.submitAnother')}
          </Button>
          <Button onClick={handleViewObservations} size="lg">
            {t('observations.submit.success.viewObservations')}
          </Button>
        </>
      }
      className="mb-8"
      description={t('observations.submit.success.description')}
      title={t('observations.submit.success.title')}
    />
  )
}

export default SubmitSuccess
