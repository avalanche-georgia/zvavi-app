import { Spinner } from '@ds/primitives'
import { ImageIcon } from 'lucide-react'

type LogoProps = {
  isUploading: boolean
  logoUrl: string | null
}

// Preview tile: the logo, a spinner while it uploads, or a placeholder
const Logo = ({ isUploading, logoUrl }: LogoProps) => {
  const getContent = () => {
    if (isUploading) return <Spinner className="text-muted" />
    if (!logoUrl) return <ImageIcon aria-hidden className="text-placeholder size-7" />

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" className="max-h-full max-w-full object-contain" src={logoUrl} />
  }

  return (
    <div className="rounded-media bg-tile grid size-24 shrink-0 place-items-center p-2">
      {getContent()}
    </div>
  )
}

export default Logo
