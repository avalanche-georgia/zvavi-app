import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ObservationSubmitFlow from './ObservationSubmitFlow'

type ObservationSubmitPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({
  params,
}: ObservationSubmitPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    title: t('observations.submit.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const ObservationSubmitPage = async ({ params }: ObservationSubmitPageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <div className="bg-canvas w-full flex-1">
      <div className="mx-auto w-full max-w-170 px-4 pt-4.5 md:pt-7">
        <header className="mb-3.5 flex flex-col gap-1">
          <h1 className="text-title md:text-title-lg text-ink font-bold">
            {t('observations.submit.heading')}
          </h1>
          <p className="text-copy-sm text-muted text-pretty">
            {t('observations.submit.subline', { regionName: t(`regions.names.${regionId}`) })}
          </p>
        </header>
        <ObservationSubmitFlow />
      </div>
    </div>
  )
}

export default ObservationSubmitPage
