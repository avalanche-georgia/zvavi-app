import { MarkdownContent } from '@components/shared'

import Prose from './Prose'
import parseHazardItems from '../model/parseHazardItems'

// Additional hazards: one bullet per hazard when written as a list, else prose
const HazardsList = ({ text }: { text: string }) => {
  const hazards = parseHazardItems(text)

  if (!hazards) return <Prose className="text-copy-lg leading-[1.6]" content={text} />

  const { intro, items } = hazards

  return (
    <>
      {intro && <Prose className="text-copy-lg mb-2 leading-[1.6]" content={intro} />}
      <ul className="text-ink text-copy-lg flex list-disc flex-col gap-2 pl-4.5 leading-[1.55]">
        {items.map((item, index) => (
          <li key={index}>
            <MarkdownContent content={item} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default HazardsList
