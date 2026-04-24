import { Drawer } from '@components/ui'
import type { AvalancheSize } from '@domain/types'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

const sizeBgColors: Record<AvalancheSize, string> = {
  1: 'bg-hazard-1/35',
  2: 'bg-hazard-2/35',
  3: 'bg-hazard-3/35',
  4: 'bg-hazard-4/35',
  5: 'bg-hazard-5/35',
}

const SizeInfo = ({ size }: { size: AvalancheSize }) => {
  const t = useTranslations()

  return (
    <div>
      <p className="mb-2">
        {t(`forecast.sections.avalancheProblems.modal.info.size.${size}.description`)}
      </p>
      <ul className="list-disc pl-4">
        {t
          .raw(`forecast.sections.avalancheProblems.modal.info.size.${size}.details`)
          ?.map((item: string) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

const AvalancheSizePip = ({ size }: { size: AvalancheSize }) => {
  const t = useTranslations()

  return (
    <Drawer
      content={<SizeInfo size={size} />}
      title={`${t('forecast.sections.recentAvalanches.labels.size')} ${size}`}
    >
      <button
        className={clsx(
          'flex size-7 flex-none items-center justify-center rounded-full text-sm font-bold text-gray-900',
          sizeBgColors[size],
        )}
        type="button"
      >
        {size}
      </button>
    </Drawer>
  )
}

export default AvalancheSizePip
