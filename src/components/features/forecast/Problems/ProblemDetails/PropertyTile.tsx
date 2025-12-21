import { Drawer, IconButton } from '@components/ui'
import { useTranslations } from 'next-intl'

type PropertyTileProps = {
  children: React.ReactNode
  property: { name: string; info?: React.ReactNode; value?: string | number }
}

const PropertyTile = ({ children, property }: PropertyTileProps) => {
  const t = useTranslations()
  const { info, name, value } = property

  const propertyName = t(`forecast.sections.avalancheProblems.modal.labels.${name}`)
  const infoTitle = value ? `${propertyName}: ${value}` : propertyName

  return (
    <div className="flex h-36 w-full max-w-36 flex-col rounded-lg border-2 bg-gray-100 p-2">
      <div className="flex h-6 flex-none items-center justify-between">
        <h5 className="text-xs text-gray-500">{propertyName}</h5>
        {info && (
          <Drawer content={info} title={infoTitle}>
            <IconButton className="stroke-gray-400" iconProps={{ icon: 'info' }} size="sm" />
          </Drawer>
        )}
      </div>
      {children}
    </div>
  )
}

export default PropertyTile
