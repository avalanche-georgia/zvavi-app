import { Link2, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

type LinkedAvalanchesEmptyProps = {
  catalogName: string
  onAddExisting: VoidFunction
  onCreate: VoidFunction
}

type OptionTileProps = {
  icon: React.ReactNode
  onClick: VoidFunction
  text: string
  title: string
}

const OptionTile = ({ icon, onClick, text, title }: OptionTileProps) => (
  <button
    className="border-rule-strong hover:border-accent focus-ring flex gap-3.5 rounded-[14px] border-[1.5px] border-dashed p-4.5 text-left transition-colors"
    onClick={onClick}
    type="button"
  >
    <span className="bg-accent-soft text-accent grid size-10 shrink-0 place-items-center rounded-xl">
      {icon}
    </span>
    <span className="flex flex-col gap-0.5">
      <span className="text-copy text-ink font-semibold">{title}</span>
      <span className="text-copy-sm text-muted">{text}</span>
    </span>
  </button>
)

// Same two options as the header actions, explained
const LinkedAvalanchesEmpty = ({
  catalogName,
  onAddExisting,
  onCreate,
}: LinkedAvalanchesEmptyProps) => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.avalanches'

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <OptionTile
        icon={<Link2 className="size-5" />}
        onClick={onAddExisting}
        text={t(`${key}.emptyExistingText`, { catalog: catalogName })}
        title={t(`${key}.addExisting`)}
      />
      <OptionTile
        icon={<Plus className="size-5" />}
        onClick={onCreate}
        text={t(`${key}.emptyCreateText`)}
        title={t(`${key}.createNew`)}
      />
    </div>
  )
}

export default LinkedAvalanchesEmpty
