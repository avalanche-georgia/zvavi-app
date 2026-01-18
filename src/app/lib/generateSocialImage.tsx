import { ImageResponse } from 'next/og'

export const socialImageConfig = {
  alt: 'Avalanche Georgia',
  contentType: 'image/png' as const,
  size: { height: 630, width: 1200 },
}

export const generateSocialImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '60px',
          width: '100%',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Logo"
          height={180}
          src="https://avalanche.ge/icon.png"
          style={{ marginBottom: '40px' }}
          width={180}
        />

        <div
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 700,
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Avalanche Georgia
        </div>

        <div
          style={{
            color: '#94a3b8',
            fontSize: 28,
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          Avalanche forecast for Gudauri and Georgian backcountry
        </div>

        <div
          style={{
            bottom: '40px',
            color: '#64748b',
            fontSize: 24,
            position: 'absolute',
          }}
        >
          avalanche.ge
        </div>
      </div>
    ),
    { ...socialImageConfig.size },
  )
