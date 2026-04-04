import { Drawer } from '@components/ui'
import { useTranslations } from 'next-intl'

import DrawerContent from './DrawerContent'

const MainPartnerPlaceholder = () => {
  const t = useTranslations()

  return (
    <Drawer content={<DrawerContent />} title={t('partners.becomePartner.title')}>
      <button
        className="bg-primary/10 flex h-36 w-64 flex-col items-center justify-center gap-3 rounded-2xl px-8 py-3"
        type="button"
      >
        <p className="text-gray-500 italic">{t('partners.main.placeholder.title')}</p>
        <p className="text-xs text-gray-400">{t('common.labels.tapForDetails')}</p>
      </button>
    </Drawer>
  )
}

export default MainPartnerPlaceholder
