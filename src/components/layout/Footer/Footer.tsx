import { useTranslations } from 'next-intl'

import FooterBottom from './FooterBottom'
import FooterLinks from './FooterLinks'
import SocialLinks from './SocialLinks'
import HeaderLogo from '../Header/HeaderLogo'

// Site footer on every public page: brand and socials, link columns, legal bar
const Footer = () => {
  const t = useTranslations()

  return (
    <footer className="border-rule bg-surface mt-6 border-t">
      <div className="mx-auto max-w-310 px-4 md:px-5 xl:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-10 pb-8 md:auto-cols-fr md:grid-flow-col md:grid-cols-[minmax(0,1.4fr)] md:gap-8 md:pt-11">
          <div className="col-span-full md:col-span-1">
            <HeaderLogo />
            <p className="text-copy-sm text-muted mt-3 mb-4 max-w-[34ch]">
              {t('footer.description')}
            </p>
            <SocialLinks />
          </div>
          <FooterLinks />
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}

export default Footer
