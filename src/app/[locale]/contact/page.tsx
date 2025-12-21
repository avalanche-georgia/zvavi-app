import { PageContent } from '@components/features/contact'
import { PageWrapper } from '@components/layout'
import { useTranslations } from 'next-intl'

const ContactPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.contact')}>
      <PageContent />
    </PageWrapper>
  )
}

export default ContactPage
