import { Tooltip } from '@components'
import { MarkdownContent } from '@components/shared'
import type { Avalanche } from '@domain/types'

const DescriptionCellContent = ({ description }: { description: Avalanche['description'] }) => {
  if (!description) return '—'

  return (
    <Tooltip
      content={
        <span className="block max-w-sm whitespace-pre-wrap">
          {<MarkdownContent content={description} />}
        </span>
      }
    >
      <div className="line-clamp-2 cursor-default">
        <MarkdownContent content={description} />
      </div>
    </Tooltip>
  )
}

export default DescriptionCellContent
