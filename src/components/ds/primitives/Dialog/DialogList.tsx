type DialogListProps = {
  // Each a short line: a link to the record, maybe muted meta after it
  items: React.ReactNode[]
  // Shown in full up to this many; the rest are counted
  max?: number
  // "+7 more"
  moreLabel: (count: number) => string
}

// The records a dialog's action touches (linked forecasts, a bulk selection)
const DialogList = ({ items, max = 5, moreLabel }: DialogListProps) => {
  const hiddenCount = items.length - max

  return (
    <div className="flex flex-col gap-1.5">
      <ul className="marker:text-rule-strong flex list-disc flex-col gap-1.5 pl-4.5">
        {items.slice(0, max).map((item, index) => (
          <li key={index} className="pl-0.5">
            {item}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && <span className="text-copy-sm text-muted">{moreLabel(hiddenCount)}</span>}
    </div>
  )
}

export default DialogList
