type ForecastCardProps = {
  color: string
  dates: string | null
  iconUri: string
  isDark: boolean
  kicker: string
  levelName: string
  logoUri: string
  regionName: string
}

const georgianLetters = /[Ⴀ-ჿ]/

// The level name gets the room left of the icon and shrinks to fit it: "Considerable" and
// "მნიშვნელოვანი" are the longest, and Georgian letters run wider
const getNameSize = (name: string) =>
  Math.min(120, 720 / (name.length * (georgianLetters.test(name) ? 0.72 : 0.6)))

// Just the danger, the region and the days — the rest is in the forecast itself
const ForecastCard = ({
  color,
  dates,
  iconUri,
  isDark,
  kicker,
  levelName,
  logoUri,
  regionName,
}: ForecastCardProps) => (
  /* eslint-disable @next/next/no-img-element -- next/og renders plain <img> only */
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
    <div
      style={{
        alignItems: 'center',
        backgroundColor: color,
        color: isDark ? '#ffffff' : '#1a1a1a',
        display: 'flex',
        flex: 1,
        gap: 36,
        padding: '0 64px',
      }}
    >
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 31, letterSpacing: 2.5, textTransform: 'uppercase' }}>
          {kicker}
        </span>
        <span style={{ fontSize: getNameSize(levelName), lineHeight: 1 }}>{levelName}</span>
      </div>
      <img alt="" src={iconUri} style={{ height: 288 }} />
    </div>

    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#ffffff',
        display: 'flex',
        gap: 26,
        height: 204,
        padding: '0 64px',
      }}
    >
      <img alt="" src={logoUri} style={{ height: 96, width: 96 }} />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 4 }}>
        <span style={{ color: '#1a1a1a', fontSize: 50, lineHeight: 1.1 }}>{regionName}</span>
        {dates && <span style={{ color: '#4a4a4a', fontSize: 34 }}>{dates}</span>}
      </div>
      <span style={{ color: '#1e3a5f', fontSize: 31 }}>avalanche.ge</span>
    </div>
  </div>
  /* eslint-enable @next/next/no-img-element */
)

export default ForecastCard
