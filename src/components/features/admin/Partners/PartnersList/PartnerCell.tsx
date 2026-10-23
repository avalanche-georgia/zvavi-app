import type { Partner } from '@domain/types'

type PartnerCellProps = {
  onOpen: (id: string) => void
  partner: Partner
}

// Logo + name (opens the partner), with the Georgian name underneath
const PartnerCell = ({ onOpen, partner }: PartnerCellProps) => {
  const { id, logoUrl, nameEn, nameKa } = partner

  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="bg-tile rounded-item grid size-10 shrink-0 place-items-center overflow-hidden p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="max-h-full max-w-full object-contain" src={logoUrl} />
      </span>
      <div className="flex min-w-0 flex-col items-start gap-0.5">
        <button
          className="focus-ring text-ink hover:text-accent rounded-badge max-w-full truncate font-semibold hover:underline"
          onClick={() => onOpen(id)}
          type="button"
        >
          {nameEn}
        </button>
        {nameKa && <p className="text-caption text-muted max-w-full truncate">{nameKa}</p>}
      </div>
    </div>
  )
}

export default PartnerCell
