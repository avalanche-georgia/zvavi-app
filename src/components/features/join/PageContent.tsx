import { HTMLContainer } from '@components/shared'
import { useTranslations } from 'next-intl'

import EducateSection from './EducateSection'
import FinancialSection from './FinancialSection'
import VolunteerSection from './VolunteerSection'

import { routes } from '@/routes'

const PageContent = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-justify">{t('joinUs.page.description')}</p>
        <HTMLContainer
          component="p"
          content={t.rich('joinUs.page.volunteer.becomeAMember', {
            a: (chunks) =>
              `<a class="text-primary underline" href="${routes.about.apply}">${chunks}</a>`,
          })}
        />
      </div>

      <VolunteerSection />
      <FinancialSection />
      <EducateSection />
    </div>
  )
}

export default PageContent
