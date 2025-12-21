import { ButtonLink } from '@components/shared'
import type { Partner } from '@data/constants/partners'
import { useTranslations } from 'next-intl'

const PartnerInfo = ({ partner }: { partner: Partner }) => {
  const t = useTranslations()

  const { infoKey, url } = partner

  return (
    <div className="flex flex-col gap-4">
      {infoKey && <p className="whitespace-pre-line text-justify">{t(infoKey)}</p>}
      <ButtonLink className="ml-auto" href={url} isExternal rel="noreferrer" target="_blank">
        {t('common.actions.visitWebsite')}
      </ButtonLink>
    </div>
  )
}

export default PartnerInfo
