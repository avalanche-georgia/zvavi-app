import { colorGroups } from './constants'

import ColorSwatch from './ColorSwatch'

const ColorTokens = () => (
  <div className="flex flex-col gap-6">
    {colorGroups.map(({ title, tokens }) => (
      <div key={title} className="flex flex-col gap-3">
        <h3 className="text-caption text-muted font-semibold tracking-wide uppercase">{title}</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tokens.map((token) => (
            <ColorSwatch key={token} name={token} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default ColorTokens
