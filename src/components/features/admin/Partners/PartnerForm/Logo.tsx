import { Icon, Spinner } from '@components'
import clsx from 'clsx'

type LogoProps = {
  hasError: boolean
  isUploading: boolean
  logoUrl: string | null
}

const Logo = ({ hasError, isUploading, logoUrl }: LogoProps) => {
  return (
    <div
      className={clsx(
        'relative flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gray-100 p-2',
        hasError && 'ring-1 ring-red-500',
      )}
    >
      {isUploading ? (
        <Spinner />
      ) : logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt="logo preview" className="size-full rounded-xl object-contain" src={logoUrl} />
      ) : (
        <Icon className="text-gray-400" icon="image" size="lg" />
      )}
    </div>
  )
}

export default Logo
