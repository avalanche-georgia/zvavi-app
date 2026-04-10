type Props = {
  bgColor: string
  iconBase64: string
  levelName: string
  logoBase64: string
  mutedColor: string
  textColor: string
  validUntil: string | null
}

const ForecastCard = ({
  bgColor,
  iconBase64,
  levelName,
  logoBase64,
  mutedColor,
  textColor,
  validUntil,
}: Props) => (
  /* eslint-disable @next/next/no-img-element */
  <div
    style={{
      backgroundColor: bgColor,
      display: 'flex',
      fontFamily: 'Inter',
      height: '100%',
      padding: '64px',
      position: 'relative',
      width: '100%',
    }}
  >
    <img
      alt="Avalanche Georgia"
      src={logoBase64}
      style={{ height: 96, left: 64, position: 'absolute', top: 48 }}
    />

    <div style={{ alignItems: 'center', display: 'flex', gap: '48px', width: '100%' }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '20px' }}>
        <span style={{ color: mutedColor, fontSize: 28 }}>Avalanche Forecast</span>
        <span style={{ color: textColor, fontSize: 88, lineHeight: 1 }}>{levelName}</span>
        {validUntil && (
          <span style={{ color: mutedColor, fontSize: 30 }}>Valid until {validUntil}</span>
        )}
      </div>

      <img alt={levelName} src={iconBase64} style={{ height: 350 }} />
    </div>
  </div>
  /* eslint-enable @next/next/no-img-element */
)

export default ForecastCard
