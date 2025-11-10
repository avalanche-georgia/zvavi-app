import { useTranslations } from 'next-intl'

import { links } from '@/UI/constants'

import { HTMLContainer } from '@/UI/components'
import EducateSection from './EducateSection'
import FinancialSection from './FinancialSection'
import VolunteerSection from './VolunteerSection'

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
              `<a class="text-primary underline" href="${links.memberForm}" rel="noreferrer" target="_blank">${chunks}</a>`,
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
