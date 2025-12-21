import { PageWrapper } from '@components/layout'
import { HTMLContainer } from '@components/shared'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.about.description'),
    title: t('seo.about.title'),
  }
}

const Page = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.about')}>
      <div className="space-y-3 text-justify">
        <HTMLContainer
          component="p"
          content={t.rich('about.content.paragraph1', {
            b: (chunks) => `<b>${chunks}</b>`,
          })}
        />

        <p>{t('about.content.paragraph2')}</p>

        <HTMLContainer
          component="p"
          content={t.rich('about.content.paragraph3', {
            strong: (chunks) => `<strong>${chunks}</strong>`,
          })}
        />

        <HTMLContainer
          component="p"
          content={t.rich('about.content.paragraph4', {
            strong: (chunks) => `<strong>${chunks}</strong>`,
          })}
        />
      </div>
    </PageWrapper>
  )
}

export default Page
