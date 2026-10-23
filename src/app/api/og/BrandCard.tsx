import { fitFontSize } from './helpers'

type BrandCardProps = {
  // Next to the logo when the title isn't the site's name already
  brandName?: string
  logoUri: string
  subtitle: string
  title: string
}

// Two ridgelines in the corner, back and front
const ridges = [
  { fill: '#24436a', points: '0,220 140,110 360,160 560,40 720,130 940,70 940,220' },
  { fill: '#2f5584', points: '200,220 330,120 420,150 560,60 650,110 760,90 940,140 940,220' },
]

// The site's and a region's link preview: a name, a line under it, no danger level — the
// image never goes stale in a messenger's cache
const BrandCard = ({ brandName, logoUri, subtitle, title }: BrandCardProps) => (
  <div
    style={{
      background: 'linear-gradient(160deg, #1e3a5f 0%, #0f172a 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      padding: '0 80px',
      position: 'relative',
      width: '100%',
    }}
  >
    <svg
      height={220}
      style={{ bottom: 0, position: 'absolute', right: 0 }}
      viewBox="0 0 940 220"
      width={940}
    >
      {ridges.map(({ fill, points }) => (
        <polygon key={points} fill={fill} points={points} />
      ))}
    </svg>

    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: 20,
        left: 80,
        position: 'absolute',
        top: 60,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> only */}
      <img alt="" src={logoUri} style={{ height: 72, width: 72 }} />
      {brandName && <span style={{ color: '#b8c6d8', fontSize: 31 }}>{brandName}</span>}
    </div>

    <span style={{ fontSize: fitFontSize(title, 1040, 132), lineHeight: 1 }}>{title}</span>
    <span style={{ color: '#c9d6e6', fontSize: 43, marginTop: 18 }}>{subtitle}</span>

    <span style={{ bottom: 60, color: '#8ea3bd', fontSize: 31, left: 80, position: 'absolute' }}>
      avalanche.ge
    </span>
  </div>
)

export default BrandCard
